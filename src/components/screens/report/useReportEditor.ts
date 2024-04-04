import { FirebaseError } from 'firebase/app'
import { useCallback, useEffect, useState } from 'react'
import {
	FormState,
	SubmitHandler,
	UseFormReset,
	UseFormSetValue
} from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { downloadPDF } from '~/core/22gkh/pdf/pdf.download'
import { downloadXML } from '~/core/22gkh/xml/xml.download'
import { useActions, useAuth, useReportsData, useTypedSelector } from '~/hooks'

import {
	showErrorNotificationWithText,
	showSuccessDataSavedNotification,
	showSuccessReportGeneratedNotification
} from '~/shared/notifications/toast'
import { ICheckReportResult, IReport } from '~/shared/types/report.interface'

import { cloudFunction } from '~/services/_functions'
import { ReportService } from '~/services/report.service'

import { handleDBErrors } from '~/utils/error/utils'
import { convertPeriod } from '~/utils/report/utils'

export const useReportEditor = (
	setValue: UseFormSetValue<IReport>,
	reset: UseFormReset<IReport>,
	formState: FormState<IReport>
) => {
	const { user } = useAuth()
	const { reports, isLoading: isDataLoading } = useReportsData()
	const [isLoading, setIsLoading] = useState(false)
	const { currentReport } = useTypedSelector(state => state.ui)
	const { setCurrentReport } = useActions()
	const { reportId } = useParams<{ reportId: string }>()

	const navigate = useNavigate()
	const closeReport = useCallback(() => navigate(`/reports`), [navigate])

	const isReportExists = reports.some(
		report => report?._id?.toString() === reportId?.toString()
	)
	const isReadyToGenerate = !formState.isDirty && formState.isValid
	const isReadyToDownload = Boolean(
		currentReport?.finalReport?.generatedAt &&
			currentReport?.finalReport?.generatedAt >= currentReport?.updatedAt
	)

	const reportEditorHeading = currentReport
		? `22-ЖКХ за ${convertPeriod(currentReport?.period)} ${currentReport?.year}`
		: ''

	useEffect(() => {
		const reportFromUrl = reportId
			? reports.find(report => report._id.toString() === reportId.toString())
			: null

		if (currentReport?._id !== reportId && reportFromUrl) {
			setCurrentReport(reportFromUrl)
		}
	}, [reportId, reports, currentReport, setCurrentReport])

	const setReportValues = useCallback(
		(report: any, parentKey = '') => {
			Object.entries(report).forEach(([key, value]) => {
				const fullKey = parentKey ? `${parentKey}.${key}` : key
				if (value !== undefined && !Number.isNaN(value)) {
					if (
						typeof value === 'object' &&
						value !== null &&
						!Array.isArray(value)
					) {
						setReportValues(value, fullKey)
					} else if (
						typeof value === 'string' ||
						typeof value === 'number' ||
						typeof value === 'boolean'
					) {
						setValue(fullKey as keyof IReport, value as any)
					}
				}
			})
		},
		[setValue]
	)

	useEffect(() => {
		if (currentReport) {
			setReportValues(currentReport)
			reset(currentReport)
		}
	}, [currentReport, setReportValues, reset])

	const saveReport: SubmitHandler<IReport> = useCallback(
		async (reportData: IReport) => {
			if (!user) return
			setIsLoading(true)
			try {
				if (!reportData.year) return

				await ReportService.update(user.uid, reportData)
				const newReportData = await ReportService.getById(
					user.uid,
					reportData._id.toString()
				)
				await setCurrentReport(newReportData)

				reset(newReportData)

				showSuccessDataSavedNotification()
			} catch (error) {
				if (error instanceof FirebaseError) handleDBErrors(error)
			} finally {
				setIsLoading(false)
			}
		},
		[user, setCurrentReport, reset]
	)

	const checkReport = useCallback(async () => {
		if (!user || !currentReport) return
		setIsLoading(true)
		try {
			const checkResult = await cloudFunction.checkReport(
				currentReport._id.toString(),
				user.uid
			)

			return checkResult.data as ICheckReportResult[]
		} catch (error) {
			if (error instanceof FirebaseError) handleDBErrors(error)
		} finally {
			setIsLoading(false)
		}
	}, [user, currentReport])

	const generateReport = useCallback(async () => {
		if (!user || !currentReport) return

		try {
			setIsLoading(true)
			const newReportData = (await cloudFunction.generateFinalReport(
				currentReport._id.toString(),
				user.uid
			)) as { data: IReport }

			setCurrentReport(newReportData.data)

			showSuccessReportGeneratedNotification()
		} catch (error) {
			if (error instanceof FirebaseError) handleDBErrors(error)
		} finally {
			setIsLoading(false)
		}
	}, [user, currentReport, setCurrentReport])

	const downloadReportPDF = useCallback(async () => {
		if (!user || !currentReport) return
		try {
			setIsLoading(true)

			const report = await ReportService.getById(
				user.uid,
				currentReport._id.toString()
			)

			downloadPDF(report)
		} catch (error) {
			if (error instanceof Error) showErrorNotificationWithText(error.message)
		} finally {
			setIsLoading(false)
		}
	}, [user, currentReport])

	const downloadReportXML = useCallback(async () => {
		if (!user || !currentReport) return
		try {
			setIsLoading(true)
			const report = await ReportService.getById(
				user.uid,
				currentReport._id.toString()
			)

			downloadXML(report)
		} catch (error) {
			if (error instanceof Error) showErrorNotificationWithText(error.message)
		} finally {
			setIsLoading(false)
		}
	}, [user, currentReport])

	return {
		isLoading: isLoading && isDataLoading,
		isReportNotExists: !isReportExists,
		isReadyToGenerate,
		isReadyToDownload,
		reportId,
		reportEditorHeading,
		saveReport,
		checkReport,
		generateReport,
		downloadReportPDF,
		downloadReportXML,
		closeReport
	}
}
