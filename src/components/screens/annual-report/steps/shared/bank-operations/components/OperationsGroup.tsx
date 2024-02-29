import Operation from './Operation'
import SeparateModal from './separate-modal/SeparateModal'
import { FC, ReactNode, memo, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6'

import { useAnnualReport } from '~/components/screens/annual-report/useAnnualReport'

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
}

const OperationsGroup: FC<OperationsGroupProps> = memo(
	({
		partnerName,
		operations,
		toggleOperationSelection,
		selectedOperations,
		showModal,
		lastBankOperationId,
		annualReportInDBId
	}) => {
		const [isVisible, setIsVisible] = useState(false)

		const showSeparateModal = (operation: IExtendedBankOperation) => {
			showModal(
				<SeparateModal
					operation={operation}
					lastBankOperationId={lastBankOperationId}
					annualReportInDBId={annualReportInDBId}
					clearSelectedOperation={() => toggleOperationSelection(operation._id)}
				/>
			)
		}

		const toggleVisible = () => setIsVisible(!isVisible)

		const handleGroupCheckboxChange = (
			e: React.ChangeEvent<HTMLInputElement>
		) => {
			const isChecked = e.target.checked
			operations.forEach(operation => {
				if (isChecked !== selectedOperations.includes(operation._id)) {
					toggleOperationSelection(operation._id)
				}
			})
		}

		const isThisSelected = (operation: IExtendedBankOperation) =>
			selectedOperations.includes(operation._id) &&
			selectedOperations.length === 1 &&
			operation.amount < 0

		return (
			<div className={styles.group}>
				<div className={styles.header}>
					<div>
						{isVisible ? (
							<FaChevronUp color='#262e59' onClick={toggleVisible} />
						) : (
							<FaChevronDown color='#262e59' onClick={toggleVisible} />
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
