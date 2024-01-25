import { FirebaseError } from 'firebase/app'
import { useCallback, useEffect, useState } from 'react'
import { SubmitHandler, UseFormReset, UseFormSetValue } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '~/hooks/useAuth'

import { IAnnualReport } from '~/shared/types/annual.interface'

import { AnnualService } from '~/services/annual.service'

import { handleDBErrors } from '~/utils/error.utils'

import { useAnnualReport } from '../../useAnnualReport'

export const useStepOne = (
	setValue: UseFormSetValue<IAnnualReport>,
	reset: UseFormReset<IAnnualReport>
) => {
	const { user } = useAuth()
	const navigate = useNavigate()
	const { currentAnnualReport } = useAnnualReport()
	const [isLoading, setIsLoading] = useState(true)
	const [initialStep, setInitialStep] = useState(0)

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
						setValue(fullKey as keyof IAnnualReport, value as any)
					}
				}
			})
		},
		[setValue]
	)

	const closeReport = useCallback(() => navigate(`/annual-reports`), [navigate])

	useEffect(() => {
		if (!currentAnnualReport) return
		console.log('currentAnnualReport: ', currentAnnualReport)
		setReportValues(currentAnnualReport)
		reset(currentAnnualReport)
		setIsLoading(false)
	}, [currentAnnualReport, setReportValues, reset])

	useEffect(() => {
		if (!currentAnnualReport?.data?.settings) return
		const settings = currentAnnualReport?.data?.settings
		if (!!settings.structure && !!settings.dataUploaded)
			return setInitialStep(2)
		if (!!settings.structure) return setInitialStep(1)
		setInitialStep(0)
	}, [currentAnnualReport?.data?.settings])

	const handleSubmit: SubmitHandler<IAnnualReport> = useCallback(
		async (reportData: IAnnualReport) => {
			if (!user || !currentAnnualReport?._id) return
			setIsLoading(true)
			try {
				const settingsInDB = await AnnualService.getSettingsById(
					user.uid,
					currentAnnualReport._id.toString()
				)

				const data = { ...settingsInDB, ...reportData.data.settings }

				await AnnualService.updateSettings(
					user.uid,
					currentAnnualReport._id.toString(),
					data
				)
				console.log(
					'TADA!!: ',
					user.uid,
					currentAnnualReport._id.toString(),
					data
				)
			} catch (error) {
				if (error instanceof FirebaseError) handleDBErrors(error)
			} finally {
				setIsLoading(false)
			}
		},
		[user, currentAnnualReport?._id]
	)

	return {
		isLoading,
		initialStep,
		handleSubmit,
		closeReport,
		currentAnnualReport
	}
}
