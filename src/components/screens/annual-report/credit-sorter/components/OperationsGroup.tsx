import Operation from './Operation'
import SeparateModal from './separate-modal/SeparateModal'
import { FC, ReactNode, memo, useCallback, useState } from 'react'
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
	level?: number
}

const OperationsGroup: FC<OperationsGroupProps> = memo(
	({
		partnerName,
		operations,
		toggleOperationSelection,
		selectedOperations,
		showModal,
		lastBankOperationId,
		level = 1
	}) => {
		const [isVisible, setIsVisible] = useState(false)
		const showSeparateModal = useCallback(
			(operation: IExtendedBankOperation) => {
				showModal(
					<SeparateModal
						operation={operation}
						lastBankOperationId={lastBankOperationId}
						clearSelectedOperation={() =>
							toggleOperationSelection(operation._id)
						}
					/>
				)
			},
			[lastBankOperationId, showModal, toggleOperationSelection]
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

		const toggleVisible = () => setIsVisible(!isVisible)

		const isThisSelected = (operation: IExtendedBankOperation) =>
			selectedOperations.includes(operation._id) &&
			selectedOperations.length === 1 &&
			operation.amount < 0 // Условие, блокирующее функционал разделения для входящих операций

		return (
			<div className={styles.group} style={{ marginLeft: `${level * 16}px` }}>
				<div className={styles.header}>
					<div>
						{isVisible ? (
							<FaChevronUp color='#262e59' onClick={toggleVisible} />
						) : (
							<FaChevronDown color='#262e59' onClick={toggleVisible} />
						)}
					</div>
					<span className={styles.partnerName}>{partnerName}</span>
					<div className={styles.counter}>({operations.length})</div>
					<input
						type='checkbox'
						onChange={handleGroupCheckboxChange}
						checked={operations.every(op =>
							selectedOperations.includes(op._id)
						)}
					/>
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
