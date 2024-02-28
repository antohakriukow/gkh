import { IAnnualReportCategoriesFormInput } from './accruals-setter.interface'
import { useEffect, useState } from 'react'
import {
	SubmitHandler,
	UseFormHandleSubmit,
	UseFormSetValue
} from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useAuth } from '~/hooks/useAuth'

import {
	IAnnualCategory,
	TypeDefinedAnnualDirection
} from '~/shared/types/annual.interface'

import { AnnualService } from '~/services/annual.service'

import { useAnnualReport } from '../../useAnnualReport'

export const useAccrualsSetter = (
	setValue: UseFormSetValue<IAnnualReportCategoriesFormInput>,
	handleSubmit: UseFormHandleSubmit<
		IAnnualReportCategoriesFormInput,
		undefined
	>,
	direction: TypeDefinedAnnualDirection
) => {
	const { user } = useAuth()
	const { annualReportInDB } = useAnnualReport()
	const { reportId } = useParams<{ reportId: string }>()
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setIsLoading(true)
		if (annualReportInDB?.data?.categories) {
			annualReportInDB.data.categories.main?.forEach(category => {
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
					const existingCategory = annualReportInDB?.data?.categories?.[
						direction
					]?.find(category => category.id === id)
					return existingCategory ? { ...existingCategory, amount } : null
				})
				.filter(Boolean)

			if (categoriesToUpdate.length > 0) {
				AnnualService.updateCategories(
					user.uid,
					reportId,
					direction,
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
