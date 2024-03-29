import { useCallback, useEffect, useMemo, useState } from 'react'

import { useAuth } from '~/hooks/useAuth'
import { useModal } from '~/hooks/useModal'
import { useWindowWidth } from '~/hooks/useWindowWidth'

import { IExtendedBankOperation } from '~/shared/types/annual.interface'

import { useAnnualReport } from '../../useAnnualReport'

const useSorter = () => {
	const [isLoading, setIsLoading] = useState(false)
	const {
		isDataLoading,
		annualReportInDB,
		isReportPayed,
		closeAnnualReport,
		deleteAnnualReport,
		redirectToAccrualsSetter,
		redirectToDebitSorter,
		redirectToCreditSorter,
		redirectToPreview
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

	const lastBankOperationId = annualReportInDB?.data?.bankOperations
		? annualReportInDB?.data?.bankOperations.length - 1
		: 0

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

	const [selectedOperations, setSelectedOperations] = useState<string[]>([])

	const toggleOperationSelection = useCallback(
		(id: string) => {
			setSelectedOperations(prev =>
				prev.includes(id) ? prev.filter(prevId => prevId !== id) : [...prev, id]
			)
		},
		[setSelectedOperations]
	)

	return {
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
		redirectToDebitSorter,
		redirectToCreditSorter,
		redirectToPreview
	}
}

export default useSorter
