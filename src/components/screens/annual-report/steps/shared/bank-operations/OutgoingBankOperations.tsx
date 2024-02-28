import OperationsGroup from './components/OperationsGroup'
import ToolBar from './components/ToolBar'
import { FC, useEffect, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import {
	getAnnualDirectionTitle,
	isExtendedBankOperation
} from '~/core/annual/shared'

import { IExtendedBankOperation } from '~/shared/types/annual.interface'

import { IWorkspaceComponentProps } from '../../step-four/workspace/workspace.interface'

import styles from './BankOperations.module.scss'

const OutgoingBankOperations: FC<
	IWorkspaceComponentProps<IExtendedBankOperation, string>
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
						const { recipientName = 'Unknown' } = operation
						if (!acc[recipientName]) {
							acc[recipientName] = []
						}
						acc[recipientName].push(operation)
						return acc
					},
					{}
				)
		: []

	const sortedOperationsArray = operationsGroupedByPartner
		? Object.entries(operationsGroupedByPartner).sort(
				(a, b) => b[1].length - a[1].length
		  )
		: []

	const onSubmit = () => handleSubmit(buffer, value)

	const disabled = buffer.length === 0

	const heading = title
		? title
		: `${
				getAnnualDirectionTitle(data?.[0]?.direction) ?? 'ЖКУ'
		  }: Не указана статья сметы`

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div>
					{isVisible ? (
						<FaChevronUp onClick={toggleVisible} />
					) : (
						<FaChevronDown onClick={toggleVisible} />
					)}
					<h4>{heading}</h4>
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
export default OutgoingBankOperations
