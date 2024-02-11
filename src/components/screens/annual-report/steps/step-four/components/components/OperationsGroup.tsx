import Operation from './Operation'
import { FC, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6'

import { IOperation } from '~/shared/types/annual.interface'

import styles from './styles.module.scss'

interface OperationsGroupProps {
	partnerName: string
	operations: IOperation[]
	toggleOperationSelection: (id: string) => void
	selectedOperations: string[]
}

const OperationsGroup: FC<OperationsGroupProps> = ({
	partnerName,
	operations,
	toggleOperationSelection,
	selectedOperations
}) => {
	const [isVisible, setIsVisible] = useState(false)

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

	return (
		<div className={styles.group}>
			<div className={styles.header}>
				<div>
					{isVisible ? (
						<FaChevronUp onClick={toggleVisible} />
					) : (
						<FaChevronDown onClick={toggleVisible} />
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
					<div className={styles.heading}>
						<div className={styles.date}>Дата</div>
						<div className={styles.amount}>Сумма</div>
						<div className={styles.description}>Содержание</div>
						<div />
					</div>
					{operations.map(operation => (
						<Operation
							key={operation._id}
							operation={operation}
							selectedOperations={selectedOperations}
							toggleOperationSelection={toggleOperationSelection}
						/>
					))}
				</div>
			)}
		</div>
	)
}

export default OperationsGroup
