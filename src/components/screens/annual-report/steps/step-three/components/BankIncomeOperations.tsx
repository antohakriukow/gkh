import OperationsGroup from './components/OperationsGroup'
import { FC, useState } from 'react'
import { isExtendedBankOperation } from '~/core/annual/shared'

import { SubHeading } from '~/components/ui'

import { IExtendedBankOperation } from '~/shared/types/annual.interface'

// Компонент для групп операций
import styles from './BankIncomeOperations.module.scss'

const BankIncomeOperations: FC<{
	operations: IExtendedBankOperation[]
	title: string
}> = ({ operations, title }) => {
	const [selectedOperations, setSelectedOperations] = useState<string[]>([])

	const toggleOperationSelection = (id: string) => {
		setSelectedOperations(prev =>
			prev.includes(id) ? prev.filter(prevId => prevId !== id) : [...prev, id]
		)
	}

	const operationsGroupedByPartner = operations
		.filter(isExtendedBankOperation)
		?.filter(operation => operation.amount > 0)
		.reduce(
			(
				acc: { [key: string]: IExtendedBankOperation[] },
				operation: IExtendedBankOperation
			) => {
				const { payerName = 'Unknown' } = operation
				if (!acc[payerName]) {
					acc[payerName] = []
				}
				acc[payerName].push(operation)
				return acc
			},
			{}
		)

	// Преобразование в массив и сортировка
	const sortedOperationsArray = operationsGroupedByPartner
		? Object.entries(operationsGroupedByPartner).sort(
				(a, b) => b[1].length - a[1].length
		  )
		: []

	return (
		<div className={styles.container}>
			<SubHeading title={title} />
			{sortedOperationsArray.map(([partnerName, operations]) => (
				<OperationsGroup
					key={partnerName}
					partnerName={partnerName}
					operations={operations}
					toggleOperationSelection={toggleOperationSelection}
					selectedOperations={selectedOperations}
				/>
			))}
		</div>
	)
}
export default BankIncomeOperations
