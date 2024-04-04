import { IAnnualReportCategoriesFormInput } from './accruals-setter.interface'
import { useEffect, useState } from 'react'
import {
	SubmitHandler,
	UseFormHandleSubmit,
	UseFormSetValue
} from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useAuth, useWindowWidth } from '~/hooks'

import {
	showErrorByDataUpdatingNotification,
	showSuccessDataUpdatedNotification
} from '~/shared/notifications/toast'
import { TypeDefinedAnnualDirection } from '~/shared/types/annual.interface'

import { AnnualService } from '~/services/annual.service'

import { getExistingDirections } from '~/utils/annual/utils'

import { useAnnualReport } from '../useAnnualReport'

export const useAccrualsSetter = (
	setValue: UseFormSetValue<IAnnualReportCategoriesFormInput>,
	handleSubmit: UseFormHandleSubmit<IAnnualReportCategoriesFormInput, undefined>
) => {
	const [isLoading, setIsLoading] = useState(false)
	const [step, setStep] = useState<number>(0) // 0, 1, 2, 3
	const { reportId } = useParams<{ reportId: string }>()
	const {
		isDataLoading,
		isReportPayed,
		annualReportInDB,
		closeAnnualReport,
		deleteAnnualReport,
		redirectToCategoriesSetter,
		redirectToCreditSorter
	} = useAnnualReport()
	const { user } = useAuth()
	const { width } = useWindowWidth()
	const isNarrow = width < 500

	const existingDirections = (
		['main', 'renovation', 'target', 'commerce'] as TypeDefinedAnnualDirection[]
	).filter(step =>
		getExistingDirections(annualReportInDB?.data?.accounts ?? []).includes(step)
	)

	const direction = existingDirections[step]

	const onSubmit: SubmitHandler<
		IAnnualReportCategoriesFormInput
	> = async data => {
		if (!user || !reportId) return

		try {
			const categoriesInDirection = [
				...(annualReportInDB?.data?.categories?.[direction] ?? [])
			]
			categoriesInDirection.forEach(
				category =>
					(category.amount = data.categories[category.id]?.amount ?? 0)
			)

			if (!categoriesInDirection.length) return

			await AnnualService.updateCategories(
				user.uid,
				reportId,
				direction,
				categoriesInDirection
			)
			showSuccessDataUpdatedNotification()
		} catch (error) {
			showErrorByDataUpdatingNotification()
		}
	}

	const onNext = async () => {
		if (step === existingDirections.length) return redirectToCreditSorter()
		setIsLoading(true)
		await handleSubmit(onSubmit)().then(() => setIsLoading(false))
		setStep(step + 1)
	}

	const onBack = async () => {
		if (step === 0) return redirectToCategoriesSetter()
		setIsLoading(true)
		await handleSubmit(onSubmit)().then(() => setIsLoading(false))
		setStep(step - 1)
	}

	useEffect(() => {
		if (annualReportInDB?.data?.categories) {
			annualReportInDB.data.categories[direction]?.forEach(category => {
				setValue(`categories.${category.id}.amount`, category.amount ?? 0)
			})
		}
	}, [annualReportInDB, setValue, direction])

	return {
		isLoading,
		isDataLoading,
		isReportPayed,
		isNarrow,
		step,
		directions: existingDirections,
		annualReportInDB,
		closeAnnualReport,
		deleteAnnualReport,
		onNext,
		onBack
	}
}
