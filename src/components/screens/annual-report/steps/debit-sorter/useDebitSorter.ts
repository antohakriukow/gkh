import { useAuth } from '~/hooks/useAuth'
import { useTypedSelector } from '~/hooks/useTypedSelector'

import { IExtendedBankOperation } from '~/shared/types/annual.interface'

import { AnnualService } from '~/services/annual.service'

import { getCategoriesWithoutChildren } from '~/utils/annual.utils'
import { areArraysEqualByKey } from '~/utils/array.utils'

import { useAnnualReport } from '../../useAnnualReport'

export const useDebitSorter = () => {
	const { user } = useAuth()
	const { bankOperations } = useTypedSelector(state => state.ui)
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

	const saveBankOperationsToDB = () => {
		if (!user || !annualReportInDB) return
		const bankOperationsInDB = annualReportInDB.data.bankOperations ?? []
		const notMainBankOperations = bankOperationsInDB.filter(
			op => op.direction !== 'main'
		)

		const resultArray = [...bankOperations, ...notMainBankOperations]
		if (
			areArraysEqualByKey(bankOperationsInDB, resultArray, '_id', 'categoryId')
		) {
			// console.log('EJECTED')
			return
		}

		try {
			// console.log('result: ', resultArray)
			AnnualService.updateBankOperations(
				user.uid,
				annualReportInDB._id.toString(),
				resultArray
			)
		} catch (error) {
			console.log('ERROR: ', error)
		}
	}

	return {
		annualReportInDB,
		isLoading,
		setBankOperationsCategory,
		clearCategoryIdIFNotExists,
		saveBankOperationsToDB
	}
}
