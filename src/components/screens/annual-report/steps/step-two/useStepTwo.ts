import { IAnnualReportCategoriesFormInput } from './step-two.interface'
import { useEffect, useState } from 'react'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useAuth } from '~/hooks/useAuth'
import { useTypedSelector } from '~/hooks/useTypedSelector'

import { IAnnualCategory } from '~/shared/types/annual.interface'

import { AnnualService } from '~/services/annual.service'

import { useAnnualReport } from '../../useAnnualReport'

export const useStepTwo = (
	setValue: UseFormSetValue<IAnnualReportCategoriesFormInput>
) => {
	const { user } = useAuth()
	// const { currentAnnualReport } = useTypedSelector(state => state.ui)
	const { annualReportInDB } = useAnnualReport()
	const { reportId } = useParams<{ reportId: string }>()
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setIsLoading(true)
		if (annualReportInDB?.data?.categories) {
			annualReportInDB.data.categories.forEach(category => {
				setValue(`categories.${category.id}.amount`, category.amount ?? 0)
			})
		}
		setIsLoading(false)
	}, [annualReportInDB, setValue])

	const onSubmit: SubmitHandler<IAnnualReportCategoriesFormInput> = data => {
		if (!user || !reportId) return
		setIsLoading(true)

		try {
			const categoriesToUpdate = Object.entries(data.categories)
				.map(([key, { amount }]) => {
					const id = parseInt(key)
					const existingCategory = annualReportInDB?.data?.categories?.find(
						category => category.id === id
					)
					return existingCategory ? { ...existingCategory, amount } : null
				})
				.filter(Boolean)

			if (categoriesToUpdate.length > 0) {
				AnnualService.updateCategories(
					user.uid,
					reportId,
					categoriesToUpdate as IAnnualCategory[]
				)
					.then(() => {
						toast('Данные успешно обновлены', { type: 'success' })
					})
					.finally(() => {
						setIsLoading(false)
					})
			}
		} catch (error) {
			console.error('Ошибка при обновлении данных:', error)
			toast('Ошибка при обновлении данных', { type: 'error' })
			setIsLoading(false)
		}
	}

	return {
		isLoading,
		onSubmit,
		annualReportInDB
	}
}
