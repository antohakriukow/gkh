import OperationsGroup from './components/OperationsGroup'
import ToolBar from './components/ToolBar'
import { FC } from 'react'
import { isExtendedBankOperation } from '~/core/annual/shared'

import { SubHeading } from '~/components/ui'

import {
	IExtendedBankOperation,
	TypeAnnualOperationTag
} from '~/shared/types/annual.interface'

import { IWorkspaceComponentProps } from '../workspace/workspace.interface'

import styles from './BankIncomeOperations.module.scss'

const BankIncomeOperations: FC<
	IWorkspaceComponentProps<IExtendedBankOperation, TypeAnnualOperationTag>
> = ({ componentData }) => {
	const { data, title, value, buffer, setBuffer, handleSubmit } = componentData

	console.log(`${title} data:  `, data)

	const toggleOperationSelection = (id: string) => {
		setBuffer(prev =>
			prev.includes(id) ? prev.filter(prevId => prevId !== id) : [...prev, id]
		)
	}

	const operationsGroupedByPartner = data
		? data
				.filter(isExtendedBankOperation)
				.filter(operation => operation.amount > 0)
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
		: []

	// Преобразование в массив и сортировка
	const sortedOperationsArray = operationsGroupedByPartner
		? Object.entries(operationsGroupedByPartner).sort(
				(a, b) => b[1].length - a[1].length
		  )
		: []

	const onSubmit = () => {
		if (!!value) handleSubmit(buffer, value)
	}

	const disabled = buffer.length === 0

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<SubHeading title={title} />
				<ToolBar onSubmit={onSubmit} disabled={disabled} />
			</div>
			<div className={styles.workspace}>
				<div className={styles.body}>
					{sortedOperationsArray.map(([partnerName, operations]) => (
						<OperationsGroup
							key={partnerName}
							partnerName={partnerName}
							operations={operations}
							toggleOperationSelection={toggleOperationSelection}
							selectedOperations={buffer}
						/>
					))}
				</div>
				<div></div>
			</div>
		</div>
	)
}
export default BankIncomeOperations
