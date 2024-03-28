import { useCallback, useEffect, useMemo, useState } from 'react'
import { getAnnualTagVariationsData } from '~/data/annual-tag-variations'

import { useAuth } from '~/hooks/useAuth'
import { useModal } from '~/hooks/useModal'
import { useWindowWidth } from '~/hooks/useWindowWidth'

import {
	showErrorByDataUpdatingNotification,
	showSuccessDataUpdatedNotification
} from '~/shared/notifications/toast'
import {
	IExtendedBankOperation,
	TypeAnnualOperationTag
} from '~/shared/types/annual.interface'

import { AnnualService } from '~/services/annual.service'

import { areArraysEqualByKey } from '~/utils/array.utils'

import { useAnnualReport } from '../useAnnualReport'

export const useCreditSorter = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [selectedOperations, setSelectedOperations] = useState<string[]>([])
	const {
		isDataLoading,
		annualReportInDB,
		isReportPayed,
		closeAnnualReport,
		deleteAnnualReport,
		redirectToAccrualsSetter,
		redirectToDebitSorter
	} = useAnnualReport()
	const { showModal } = useModal()
	const { user } = useAuth()
	const { width } = useWindowWidth()
	const isNarrow = width < 500

	const initialOperations = useMemo(
		() =>
			annualReportInDB?.data?.bankOperations?.filter(
				operation => operation.direction === 'main'
			) ?? [],
		[annualReportInDB?.data?.bankOperations]
	)

	const [localOperations, setLocalOperations] =
		useState<IExtendedBankOperation[]>(initialOperations)

	const lastBankOperationId = localOperations.length - 1
	const tags = getAnnualTagVariationsData('main')

	useEffect(() => {
		if (
			localOperations.length === 0 &&
			!!annualReportInDB?.data?.bankOperations
		)
			setLocalOperations(
				annualReportInDB?.data?.bankOperations?.filter(
					operation => operation.direction === 'main'
				)
			)
	}, [
		localOperations,
		setLocalOperations,
		annualReportInDB?.data?.bankOperations
	])

	const toggleOperationSelection = useCallback(
		(id: string) => {
			setSelectedOperations(prev =>
				prev.includes(id) ? prev.filter(prevId => prevId !== id) : [...prev, id]
			)
		},
		[setSelectedOperations]
	)

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
