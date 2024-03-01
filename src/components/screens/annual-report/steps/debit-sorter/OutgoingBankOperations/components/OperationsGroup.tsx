import Operation from './Operation'
import SeparateModal from './separate-modal/SeparateModal'
import { FC, ReactNode, memo, useCallback } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6'

import { IExtendedBankOperation } from '~/shared/types/annual.interface'

import styles from './operations.module.scss'

interface OperationsGroupProps {
	partnerName: string
	operations: IExtendedBankOperation[]
	toggleOperationSelection: (id: string) => void
	selectedOperations: string[]
	showModal: (component: ReactNode) => void
	lastBankOperationId: number
	annualReportInDBId: string | undefined
	isVisible: boolean
	toggleVisibility: () => void
}

const OperationsGroup: FC<OperationsGroupProps> = memo(
	({
		partnerName,
		operations,
		toggleOperationSelection,
		selectedOperations,
		showModal,
		lastBankOperationId,
		annualReportInDBId,
		isVisible,
		toggleVisibility
	}) => {
		const showSeparateModal = useCallback(
			(operation: IExtendedBankOperation) => {
				showModal(
					<SeparateModal
						operation={operation}
						lastBankOperationId={lastBankOperationId}
						annualReportInDBId={annualReportInDBId}
						clearSelectedOperation={() =>
							toggleOperationSelection(operation._id)
						}
					/>
				)
			},
			[
				annualReportInDBId,
				lastBankOperationId,
				showModal,
				toggleOperationSelection
			]
		)

		const handleGroupCheckboxChange = useCallback(
			(e: React.ChangeEvent<HTMLInputElement>) => {
				const isChecked = e.target.checked
				operations.forEach(operation => {
					if (isChecked !== selectedOperations.includes(operation._id)) {
						toggleOperationSelection(operation._id)
					}
				})
			},
			[operations, selectedOperations, toggleOperationSelection]
		)

		const isThisSelected = (operation: IExtendedBankOperation) =>
			selectedOperations.includes(operation._id) &&
			selectedOperations.length === 1 &&
			operation.amount < 0

		return (
			<div className={styles.group}>
				<div className={styles.header}>
					<div>
						{isVisible ? (
							<FaChevronUp color='#262e59' onClick={toggleVisibility} />
						) : (
							<FaChevronDown color='#262e59' onClick={toggleVisibility} />
						)}
						<span className={styles.partnerName}>{partnerName}</span>
					</div>
					<div>
						<div className={styles.counter}>({operations.length})</div>
						<input
							type='checkbox'
							onChange={handleGroupCheckboxChange}
							checked={operations.every(op =>
								selectedOperations.includes(op._id)
							)}
						/>
					</div>
				</div>
				{isVisible && (
					<div className={styles.body}>
						{operations.map(operation => (
							<Operation
								key={operation._id}
								operation={operation}
								toggleOperationSelection={toggleOperationSelection}
								showSeparateButton={isThisSelected}
								showSeparateModal={showSeparateModal}
								isChecked={selectedOperations.includes(operation._id)}
							/>
						))}
					</div>
				)}
			</div>
		)
	}
)

export default OperationsGroup
