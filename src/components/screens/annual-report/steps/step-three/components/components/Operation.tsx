import { FC } from 'react'

import {
	IExtendedBankOperation,
	IOperation
} from '~/shared/types/annual.interface'

import styles from './styles.module.scss'

interface IOperationProps {
	operation: IExtendedBankOperation
	toggleOperationSelection: (id: string) => void
	selectedOperations: string[]
}

const Operation: FC<IOperationProps> = ({
	operation,
	toggleOperationSelection,
	selectedOperations
}) => {
	const handleChange = () => {
		toggleOperationSelection(operation._id)
	}

	return (
		<div id={operation._id} className={styles.operation}>
			<div>{operation.date}</div>
			<div>{operation.amount}</div>
			<div className={styles.description} title={operation.paymentPurpose}>
				{operation.paymentPurpose}
			</div>
			<input
				type='checkbox'
				onChange={handleChange}
				checked={selectedOperations.includes(operation._id)}
			/>
		</div>
	)
}
export default Operation
