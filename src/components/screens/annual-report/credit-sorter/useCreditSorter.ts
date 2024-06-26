import { useMemo } from 'react'
import { getAnnualTagVariationsData } from '~/data/annual-tag-variations'

import {
	showErrorByDataUpdatingNotification,
	showSuccessDataUpdatedNotification
} from '~/shared/notifications/toast'
import {
	IExtendedBankOperation,
	TypeAnnualOperationTag
} from '~/shared/types/annual.interface'

import { AnnualService } from '~/services/annual.service'

import { areArraysEqualByKey } from '~/utils/array/utils'

import { useSorter } from '../../../shared'

export const useCreditSorter = () => {
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
		redirectToAccrualsSetter,
		redirectToDebitSorter
	} = useSorter()

	const tags = getAnnualTagVariationsData('main')

	const handleSubmit = (tag: TypeAnnualOperationTag) => {
		setLocalOperations(
			localOperations.map(operation =>
				selectedOperations.includes(operation._id)
					? { ...operation, tag }
					: operation
			)
		)
		setSelectedOperations([])
	}

	const { operationsWithTag, operationsWithoutTag } = useMemo(() => {
		let operationsWithTag = [] as IExtendedBankOperation[]
		let operationsWithoutTag = [] as IExtendedBankOperation[]

		localOperations
			.filter(operation => operation.amount > 0)
			.forEach(operation => {
				operation.tag === undefined || operation.tag === ''
					? operationsWithoutTag.push(operation)
					: operationsWithTag.push(operation)
			})

		return {
			operationsWithTag,
			operationsWithoutTag
		}
	}, [localOperations])

	const saveBankOperationsToDB = async () => {
		if (!user || !annualReportInDB) return
		const localOperationsInDB = annualReportInDB.data.bankOperations ?? []
		const notMainBankOperations = localOperationsInDB.filter(
			op => op.direction !== 'main'
		)

		const resultArray = [...localOperations, ...notMainBankOperations]
		if (areArraysEqualByKey(localOperationsInDB, resultArray, '_id', 'tag'))
			return

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
		redirectToAccrualsSetter()
	}

	const onNext = async () => {
		await saveBankOperationsToDB()
		redirectToDebitSorter()
	}

	return {
		isNarrow,
		isLoading,
		isDataLoading,
		isReportPayed,
		localOperations,
		selectedOperations,
		operationsWithoutTag,
		operationsWithTag,
		lastBankOperationId,
		tags,
		showModal,
		setLocalOperations,
		toggleOperationSelection,
		closeAnnualReport,
		deleteAnnualReport,
		handleSubmit,
		onNext,
		onBack
	}
}
