import React from 'react'

import { IExtendedBankOperation } from '~/shared/types/annual.interface'

import { formatNumber } from '~/utils/number.utils'

import styles from '../table.module.scss'

interface OperationRowProps {
	operation: IExtendedBankOperation
}

const Row: React.FC<OperationRowProps> = ({ operation }) => {
	const isIncome = operation.amount > 0
	return (
		<div className={`${styles.gridRow} ${styles.operationRow}`}>
			<div></div> {/* Заполнитель для иконки */}
			<div>{operation.paymentPurpose}</div>
			<div></div>
			<div>{isIncome ? formatNumber(operation.amount) : ''}</div>
			<div>{isIncome ? '' : formatNumber(operation.amount)}</div>
		</div>
	)
}

export default Row
