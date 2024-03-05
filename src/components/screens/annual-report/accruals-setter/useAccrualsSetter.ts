import { IAnnualReportCategoriesFormInput } from './accruals-setter.interface'
import { useEffect } from 'react'
import { UseFormSetValue } from 'react-hook-form'

import { TypeDefinedAnnualDirection } from '~/shared/types/annual.interface'

import { useAnnualReport } from '../useAnnualReport'

export const useAccrualsSetter = (
	setValue: UseFormSetValue<IAnnualReportCategoriesFormInput>,
	direction: TypeDefinedAnnualDirection
) => {
	const { annualReportInDB } = useAnnualReport()

	useEffect(() => {
		if (annualReportInDB?.data?.categories) {
			annualReportInDB.data.categories[direction]?.forEach(category => {
				setValue(`categories.${category.id}.amount`, category.amount ?? 0)
			})
		}
	}, [annualReportInDB, setValue, direction])

	return { annualReportInDB }
}
