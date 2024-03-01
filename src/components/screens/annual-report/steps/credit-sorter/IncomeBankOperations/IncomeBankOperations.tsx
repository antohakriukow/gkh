import OperationsGroup from './components/OperationsGroup'
import ToolBar from './components/ToolBar'
import { FC, memo, useCallback, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import {
	getAnnualDirectionTitle,
	isExtendedBankOperation
} from '~/core/annual/shared'

import { SubHeading } from '~/components/ui'

import { useModal } from '~/hooks/useModal'

import {
	IExtendedBankOperation,
	TypeAnnualOperationTag
} from '~/shared/types/annual.interface'

import { useAnnualReport } from '../../../useAnnualReport'
import { IWorkspaceComponentProps } from '../workspace/workspace.interface'

import styles from './BankOperations.module.scss'

const IncomeBankOperations: FC<
	IWorkspaceComponentProps<IExtendedBankOperation, TypeAnnualOperationTag>
> = memo(({ componentData }) => {
	const { data, title, value, buffer, setBuffer, handleSubmit } = componentData
	const [isVisible, setIsVisible] = useState(true)
	const { lastBankOperationId, annualReportInDBId } = useAnnualReport()
	const { showModal } = useModal()

	const toggleVisible = () => setIsVisible(!isVisible)

	const toggleOperationSelection = useCallback(
		(id: string) => {
			setBuffer(prev =>
				prev.includes(id) ? prev.filter(prevId => prevId !== id) : [...prev, id]
			)
		},
		[setBuffer]
	)

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

	const sortedOperationsArray = operationsGroupedByPartner
		? Object.entries(operationsGroupedByPartner).sort(
				(a, b) => b[1].length - a[1].length
		  )
		: []

	const onSubmit = useCallback(
		() => handleSubmit(buffer, value),
		[handleSubmit, buffer, value]
	)

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
								showModal={showModal}
								lastBankOperationId={lastBankOperationId}
								annualReportInDBId={annualReportInDBId}
							/>
						))}
				</div>
				<div></div>
			</div>
		</div>
	)
})

export default IncomeBankOperations
