import OperationsGroup from './components/OperationsGroup'
import ToolBar from './components/ToolBar'
import { FC, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import {
	getAnnualDirectionTitle,
	isExtendedBankOperation
} from '~/core/annual/shared'

import { SubHeading } from '~/components/ui'

import {
	IExtendedBankOperation,
	TypeAnnualOperationTag
} from '~/shared/types/annual.interface'

import { IWorkspaceComponentProps } from '../../step-three/workspace/workspace.interface'

import styles from './BankOperations.module.scss'

const BankOperations: FC<
	IWorkspaceComponentProps<IExtendedBankOperation, TypeAnnualOperationTag>
> = ({ componentData }) => {
	const { data, title, value, buffer, setBuffer, handleSubmit } = componentData
	const [isVisible, setIsVisible] = useState(true)

	const toggleVisible = () => setIsVisible(!isVisible)

	const toggleOperationSelection = (id: string) => {
		setBuffer(prev =>
			prev.includes(id) ? prev.filter(prevId => prevId !== id) : [...prev, id]
		)
	}

	const operationsGroupedByPartner = data
		? data
				.filter(isExtendedBankOperation)
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

	const onSubmit = () => handleSubmit(buffer, value)

	const disabled = buffer.length === 0

	const heading = title
		? title
		: `${getAnnualDirectionTitle(
				data?.[0].direction
		  )}: Поступления от собственников`

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div>
					{isVisible ? (
						<FaChevronUp onClick={toggleVisible} />
					) : (
						<FaChevronDown onClick={toggleVisible} />
					)}
					<SubHeading title={heading} />
				</div>
				<ToolBar onSubmit={onSubmit} disabled={disabled} />
			</div>
			<div className={styles.workspace}>
				<div className={styles.body}>
					{isVisible &&
						sortedOperationsArray.map(([partnerName, operations]) => (
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
export default BankOperations
