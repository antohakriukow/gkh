import { useCallback, useEffect, useState } from 'react'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { downloadXML } from '~/report-logic/22gkh/downloadXML'
import { generate22gkhReport } from '~/report-logic/22gkh/generate22gkhReport'

import { useActions } from '~/hooks/useActions'
import { useAuth } from '~/hooks/useAuth'
import { useTypedSelector } from '~/hooks/useTypedSelector'

import { IReport } from '~/shared/types/report.interface'

import { ReportService } from '~/services/report.service'

export const useReportEditor = (setValue: UseFormSetValue<IReport>) => {
	const { user } = useAuth()
	const { currentReport } = useTypedSelector(state => state.ui)
	const { setCurrentReport } = useActions()
	const [isLoading, setIsLoading] = useState(false)

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
		}
	}, [currentReport, setReportValues])

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
		} catch (error) {
			// console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	const generateReport = async () => {
		if (!user || !currentReport) return
		setIsLoading(true)
		const finalReport = generate22gkhReport(currentReport)
		try {
			ReportService.generate(
				user.uid,
				currentReport._id.toString(),
				finalReport
			)
		} catch (error) {
			// console.log(error)
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
		} catch (error) {
			// console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	return {
		isLoading,
		onSubmit,
		generateReport,
		downloadReportXML,
		currentReport
	}
}
