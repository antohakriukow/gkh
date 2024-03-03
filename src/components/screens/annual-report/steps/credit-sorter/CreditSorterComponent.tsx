import Tag from './components/Tag'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { getAnnualTagVariationsData } from '~/data/annual-tag-variations'

import { useActions } from '~/hooks/useActions'
import { useModal } from '~/hooks/useModal'
import { useTypedSelector } from '~/hooks/useTypedSelector'

import {
	IAnnualReport,
	IExtendedBankOperation,
	TypeAnnualOperationTag
} from '~/shared/types/annual.interface'

import styles from './credit-sorter.module.scss'

const CreditSorterComponent: FC<{ report: IAnnualReport }> = ({ report }) => {
	// const initialOperations = useMemo(
	// 	() =>
	// 		report.data.bankOperations?.filter(
	// 			operation => operation.direction === 'main'
	// 		) ?? [],
	// 	[report.data.bankOperations]
	// )

	const { showModal } = useModal()
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

	const tags = getAnnualTagVariationsData('main')
	const lastBankOperationId = localOperations.length - 1

	return (
		<div className={styles.container}>
			<div className={styles.leftSide}>
				<Tag
					tag={{ title: 'ЖКУ: Поступления от собственников', value: '' }}
					toggleOperationSelection={toggleOperationSelection}
					selectedOperations={selectedOperations}
					showModal={showModal}
					lastBankOperationId={lastBankOperationId}
					operations={operationsWithoutTag}
					handleSubmit={handleSubmit}
				/>
			</div>
			<div className={styles.rightSide}>
				{tags.map(tag => (
					<Tag
						key={tag.value}
						tag={tag}
						toggleOperationSelection={toggleOperationSelection}
						selectedOperations={selectedOperations}
						showModal={showModal}
						lastBankOperationId={lastBankOperationId}
						operations={operationsWithTag.filter(op => op.tag === tag.value)}
						handleSubmit={handleSubmit}
					/>
				))}
			</div>
		</div>
	)
}
export default CreditSorterComponent
