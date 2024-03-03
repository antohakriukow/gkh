import Category from './components/Category'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'

import { useActions } from '~/hooks/useActions'
import { useModal } from '~/hooks/useModal'
import { useTypedSelector } from '~/hooks/useTypedSelector'

import {
	IAnnualCategory,
	IAnnualReport,
	IExtendedBankOperation
} from '~/shared/types/annual.interface'

import { getOperationsByCategory } from '~/utils/annual.utils'

import styles from './debit-sorter.module.scss'

const DebitSorterComponent: FC<{
	report: IAnnualReport
	// handleSubmit: (operationIds: string[], categoryId: string) => void
}> = ({ report }) => {
	// const initialOperations = useMemo(
	// 	() =>
	// 		report.data.bankOperations?.filter(
	// 			operation => operation.direction === 'main'
	// 		) ?? [],
	// 	[report.data.bankOperations]
	// )

	// Временное решение до тех пор, пока не откажусь от компонента Quiz в пользу навигации
	const { bankOperations: localOperations } = useTypedSelector(
		state => state.ui
	)
	const { setBankOperations: setLocalOperations } = useActions()

	useEffect(() => {
		if (localOperations.length === 0 && !!report.data.bankOperations)
			setLocalOperations(
				report.data.bankOperations?.filter(
					operation => operation.direction === 'main'
				)
			)
	}, [localOperations, setLocalOperations, report.data.bankOperations])

	// const [localOperations, setLocalOperations] =
	// 	useState<IExtendedBankOperation[]>(initialOperations)
	const [selectedOperations, setSelectedOperations] = useState<string[]>([])

	const { showModal } = useModal()

	const lastBankOperationId = localOperations.length - 1

	const toggleOperationSelection = useCallback(
		(id: string) => {
			setSelectedOperations(prev =>
				prev.includes(id) ? prev.filter(prevId => prevId !== id) : [...prev, id]
			)
		},
		[setSelectedOperations]
	)

	const handleSubmit = (categoryId: string) => {
		setLocalOperations(
			localOperations.map(operation =>
				selectedOperations.includes(operation._id)
					? { ...operation, categoryId: categoryId }
					: operation
			)
		)
		setSelectedOperations([])
	}

	const categoriesWithoutChildrenIds = useMemo(
		() =>
			((report.data.categories?.main ?? []) as IAnnualCategory[])
				.filter(category => !category.children)
				.map(category => category.id),
		[report.data.categories]
	)

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

	return (
		<div className={styles.container}>
			<div className={styles.leftSide}>
				<Category
					category={mockUnsortedCategory}
					toggleOperationSelection={toggleOperationSelection}
					selectedOperations={selectedOperations}
					showModal={showModal}
					lastBankOperationId={lastBankOperationId}
					operations={unsortedOperations}
					handleSubmit={handleSubmit}
				/>
			</div>
			<div className={styles.rightSide}>
				{report?.data?.categories?.main?.map(category => (
					<Category
						key={category.id}
						category={category}
						operations={getOperationsByCategory(sortedOperations, category)}
						toggleOperationSelection={toggleOperationSelection}
						selectedOperations={selectedOperations}
						showModal={showModal}
						lastBankOperationId={lastBankOperationId}
						handleSubmit={handleSubmit}
					/>
				))}
			</div>
		</div>
	)
}

export default DebitSorterComponent
