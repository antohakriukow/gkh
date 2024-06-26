import { useMemo } from 'react'

import {
	showErrorByDataUpdatingNotification,
	showSuccessDataUpdatedNotification
} from '~/shared/notifications/toast'
import { IExtendedBankOperation } from '~/shared/types/annual.interface'

import { AnnualService } from '~/services/annual.service'

import { getAllLeafCategoryIds } from '~/utils/annual/utils'
import { areArraysEqualByKey } from '~/utils/array/utils'

import { useSorter } from '../../../shared'

export const useDebitSorter = () => {
	const {
		isLoading,
		isDataLoading,
		isNarrow,
		isReportPayed,
		user,
		localOperations,
		selectedOperations,
		lastBankOperationId,
		annualReportInDB,
		setIsLoading,
		setLocalOperations,
		setSelectedOperations,
		toggleOperationSelection,
		showModal,
		closeAnnualReport,
		deleteAnnualReport,
		redirectToCreditSorter,
		redirectToPreview
	} = useSorter()

	const handleSubmit = (categoryId: string) => {
		setLocalOperations(
			localOperations.map(operation =>
				selectedOperations.includes(operation._id)
					? { ...operation, categoryId }
					: operation
			)
		)

		setSelectedOperations([])
	}

	const categoriesWithoutChildrenIds = useMemo(() => {
		const mainCategories = annualReportInDB?.data?.categories?.main ?? []
		return getAllLeafCategoryIds(mainCategories)
	}, [annualReportInDB?.data?.categories])

	const { sortedOperations, unsortedOperations } = useMemo(() => {
		let sortedOps = [] as IExtendedBankOperation[]
		let unsortedOps = [] as IExtendedBankOperation[]

		localOperations
			.filter(operation => operation.amount < 0)
			.forEach(operation => {
				!categoriesWithoutChildrenIds.includes(operation.categoryId) ||
				operation.categoryId === '' ||
				operation.categoryId === undefined
					? unsortedOps.push(operation)
					: sortedOps.push(operation)
			})

		return {
			sortedOperations: sortedOps,
			unsortedOperations: unsortedOps
		}
	}, [localOperations, categoriesWithoutChildrenIds])

	const mockUnsortedCategory = {
		value: 'ЖКУ: Прочие списания',
		id: ''
	}

	const saveBankOperationsToDB = async () => {
		if (!user || !annualReportInDB) return
		const bankOperationsInDB = annualReportInDB.data.bankOperations ?? []
		const notMainBankOperations = bankOperationsInDB.filter(
			op => op.direction !== 'main'
		)

		const resultArray = [...localOperations, ...notMainBankOperations]
		if (
			areArraysEqualByKey(bankOperationsInDB, resultArray, '_id', 'categoryId')
		) {
			return
		}

		setIsLoading(true)

		try {
			await AnnualService.updateBankOperations(
				user.uid,
				annualReportInDB._id.toString(),
				resultArray
			)
			showSuccessDataUpdatedNotification()
		} catch (error) {
			showErrorByDataUpdatingNotification()
		} finally {
			setIsLoading(false)
		}
	}

	const onBack = async () => {
		await saveBankOperationsToDB()
		redirectToCreditSorter()
	}

	const onNext = async () => {
		await saveBankOperationsToDB()
		redirectToPreview()
	}

	return {
		isLoading,
		isDataLoading,
		isNarrow,
		isReportPayed,
		annualReportInDB,
		localOperations,
		selectedOperations,
		sortedOperations,
		unsortedOperations,
		lastBankOperationId,
		mockUnsortedCategory,
		setLocalOperations,
		toggleOperationSelection,
		showModal,
		closeAnnualReport,
		deleteAnnualReport,
		onNext,
		onBack,
		handleSubmit
	}
}
