import { FirebaseError } from 'firebase/app'
import { useCallback, useEffect, useState } from 'react'
import { SubmitHandler, UseFormReset, UseFormSetValue } from 'react-hook-form'
import { toast } from 'react-toastify'
import { downloadPDF } from '~/core/22gkh/pdf/pdf.download'
import { downloadXML } from '~/core/22gkh/xml/xml.download'

import { useActions } from '~/hooks/useActions'
import { useAuth } from '~/hooks/useAuth'
import { useTypedSelector } from '~/hooks/useTypedSelector'

import { IReport } from '~/shared/types/report.interface'

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
	const [isLoading, setIsLoading] = useState(false)

	const reportEditorHeading = currentReport
		? `Отчет 22-ЖКХ (Жилище) за ${convertPeriod(
				currentReport?.period
		  )} ${currentReport?.year}`
		: ''

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

	const closeReport = () => {
		setCurrentReport(null)
	}

	const handleEscKey = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape') setCurrentReport(null)
		},
		[setCurrentReport]
	)

	useEffect(() => {
		document.addEventListener('keydown', handleEscKey)

		return () => {
			document.removeEventListener('keydown', handleEscKey)
		}
	}, [handleEscKey])

	useEffect(() => {
		if (currentReport) {
			setReportValues(currentReport)
			reset(currentReport)
		}
	}, [currentReport, setReportValues, reset])

	const onSubmit: SubmitHandler<IReport> = async (reportData: IReport) => {
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
	}

	const generateReport = async () => {
		if (!user || !currentReport) return
		setIsLoading(true)

		try {
			const newReportData = (await cloudFunction.generateFinalReport(
				currentReport._id.toString()
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
	}

	const downloadReportPDF = async () => {
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
	}

	const downloadReportXML = async () => {
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
	}

	return {
		isLoading,
		reportEditorHeading,
		onSubmit,
		generateReport,
		downloadReportPDF,
		downloadReportXML,
		currentReport,
		closeReport
	}
}
