import { FirebaseError } from 'firebase/app'
import { useCallback, useEffect, useState } from 'react'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'

import { useAnnualReport } from '~/components/screens/annual-report/useAnnualReport'

import { useAuth } from '~/hooks/useAuth'

import {
	IAnnualReport,
	IAnnualReportSettings
} from '~/shared/types/annual.interface'

import { AnnualService } from '~/services/annual.service'

import { handleDBErrors } from '~/utils/error.utils'

export const useStepOne = (
	setValue: UseFormSetValue<IAnnualReportSettings>
): {
	isLoading: boolean
	handleSubmit: SubmitHandler<IAnnualReportSettings>
} => {
	const { user } = useAuth()
	const [isLoading, setIsLoading] = useState(false)
	const { currentAnnualReport } = useAnnualReport()

	const setAnnualReportSettings = useCallback(
		(currentAnnualReport: IAnnualReport) => {
			const settings = currentAnnualReport?.data?.settings
			if (!settings) return

			Object.keys(settings).forEach(key => {
				const fieldKey = key as keyof IAnnualReportSettings
				const fieldValue = settings[
					fieldKey
				] as unknown as IAnnualReportSettings[keyof IAnnualReportSettings]
				setValue(fieldKey, fieldValue)
			})
		},
		[setValue]
	)

	useEffect(() => {
		if (currentAnnualReport) setAnnualReportSettings(currentAnnualReport)
	}, [currentAnnualReport, setAnnualReportSettings])

	const handleSubmit: SubmitHandler<IAnnualReportSettings> = useCallback(
		async (reportData: IAnnualReportSettings) => {
			if (!user || !currentAnnualReport?._id) return
			setIsLoading(true)
			try {
				const settingsInDB = await AnnualService.getSettingsById(
					user.uid,
					currentAnnualReport._id.toString()
				)

				const data = { ...settingsInDB, ...reportData }

				// await AnnualService.updateSettings(
				// 	user.uid,
				// 	currentAnnualReport._id.toString(),
				// 	data
				// )
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

	return { isLoading, handleSubmit }
}
