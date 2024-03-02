import { useAuth } from '~/hooks/useAuth'

import { IExtendedBankOperation } from '~/shared/types/annual.interface'

import { AnnualService } from '~/services/annual.service'

import { getCategoriesWithoutChildren } from '~/utils/annual.utils'

import { useAnnualReport } from '../../useAnnualReport'

export const useDebitSorter = () => {
	const { user } = useAuth()
	const { annualReportInDB, isLoading } = useAnnualReport()

	const setBankOperationsCategory = (
		operationIds: string[],
		categoryId: string
	) => {
		if (!user || !annualReportInDB) return

		try {
			AnnualService.updateBankOperationCategories(
				user.uid,
				annualReportInDB?._id.toString(),
				categoryId,
				operationIds
			)
		} catch (error) {
			console.log(error)
		}
	}

	const clearCategoryIdIFNotExists = () => {
		if (
			!annualReportInDB ||
			!annualReportInDB.data ||
			!annualReportInDB.data.categories
		)
			return

		const existingCategories = getCategoriesWithoutChildren(
			annualReportInDB.data.categories.main ?? []
		).map(category => category.value)
		const mainBankOperations = (
			annualReportInDB.data.bankOperations ?? []
		).filter(
			operation =>
				operation.direction === 'main' &&
				operation.amount < 0 &&
				operation.categoryId !== ''
		)

		const operationsToClear = [] as string[]
		mainBankOperations?.forEach(operation => {
			if (!existingCategories.includes(operation.categoryId))
				operationsToClear.push(operation._id)
		})

		if (!!operationsToClear) setBankOperationsCategory(operationsToClear, '')
	}

	return {
		annualReportInDB,
		isLoading,
		setBankOperationsCategory,
		clearCategoryIdIFNotExists
	}
}
