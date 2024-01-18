import { FirebaseError } from 'firebase/app'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { SubmitHandler, UseFormReset, UseFormSetValue } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { downloadPDF } from '~/core/22gkh/pdf/pdf.download'
import { downloadXML } from '~/core/22gkh/xml/xml.download'

import { useActions } from '~/hooks/useActions'
import { useAuth } from '~/hooks/useAuth'
import { useData } from '~/hooks/useData'
import { useTypedSelector } from '~/hooks/useTypedSelector'

import { ICheckReportResult, IReport } from '~/shared/types/report.interface'

import { cloudFunction } from '~/services/_functions'
import { ReportService } from '~/services/report.service'

import { handleDBErrors } from '~/utils/error.utils'
import { convertPeriod } from '~/utils/report.utils'

export const useReportEditor = (
	setValue: UseFormSetValue<IReport>,
	reset: UseFormReset<IReport>
) => {
	const { user } = useAuth()
	const { currentReport } = useTypedSelector(state => state.ui)
	const { setCurrentReport } = useActions()
	const { reports } = useData()
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)

	const reportEditorHeading = currentReport
		? `Отчет 22-ЖКХ (Жилище) за ${convertPeriod(
				currentReport?.period
		  )} ${currentReport?.year}`
		: ''

	const { reportId } = useParams<{ reportId: string }>()

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

	const closeReport = useCallback(() => navigate(`/reports`), [navigate])

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

				toast.success('Данные сохранены', { autoClose: 3000 })
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
			if (error instanceof FirebaseError) {
				handleDBErrors(error)
			} else {
				console.log(error)
			}
		} finally {
			setIsLoading(false)
		}
	}, [user, currentReport])

	const generateReport = useCallback(async () => {
		if (!user || !currentReport) return
		setIsLoading(true)

		try {
			const newReportData = (await cloudFunction.generateFinalReport(
				currentReport._id.toString(),
				user.uid
			)) as { data: IReport }

			setCurrentReport(newReportData.data)

			cloudFunction.createLog(user.uid, 'info', 'report22/generate', {
				data: newReportData.data.finalReport
			})

			toast.success('Генерация отчета завершена', { autoClose: 3000 })
		} catch (error) {
			if (error instanceof FirebaseError) handleDBErrors(error)
		} finally {
			setIsLoading(false)
		}
	}, [user, currentReport, setCurrentReport])

	const downloadReportPDF = useCallback(async () => {
		if (!user || !currentReport) return
		setIsLoading(true)
		try {
			const report = await ReportService.getById(
				user.uid,
				currentReport._id.toString()
			)
			downloadPDF(report)
			cloudFunction.createLog(user.uid, 'info', 'report22/pdf', {
				data: report
			})
		} catch (error) {
			if (error instanceof Error) toast(error.message, { autoClose: 3000 })
			cloudFunction.createLog(user.uid, 'error', 'report22/pdf', {
				data: currentReport,
				error
			})
		} finally {
			setIsLoading(false)
		}
	}, [user, currentReport])

	const downloadReportXML = useCallback(async () => {
		if (!user || !currentReport) return
		setIsLoading(true)
		try {
			const report = await ReportService.getById(
				user.uid,
				currentReport._id.toString()
			)

			downloadXML(report)
			cloudFunction.createLog(user.uid, 'info', 'report22/xml', {
				data: report
			})
		} catch (error) {
			if (error instanceof Error) toast(error.message, { autoClose: 3000 })
			cloudFunction.createLog(user.uid, 'error', 'report22/xml', {
				data: currentReport,
				error
			})
		} finally {
			setIsLoading(false)
		}
	}, [user, currentReport])

	return useMemo(
		() => ({
			isLoading,
			reportEditorHeading,
			saveReport,
			checkReport,
			generateReport,
			downloadReportPDF,
			downloadReportXML,
			currentReport,
			closeReport
		}),
		[
			isLoading,
			reportEditorHeading,
			saveReport,
			checkReport,
			generateReport,
			downloadReportPDF,
			downloadReportXML,
			currentReport,
			closeReport
		]
	)
}
