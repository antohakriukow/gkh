import React from 'react'

import { IExtendedBankOperation } from '~/shared/types/annual.interface'

import { formatNumber } from '~/utils/number.utils'

import styles from '../table.module.scss'

interface OperationRowProps {
	operation: IExtendedBankOperation
}

const Row: React.FC<OperationRowProps> = ({ operation }) => {
	return (
		<div className={`${styles.gridRow} ${styles.operationRow}`}>
			<div></div> {/* Заполнитель для иконки */}
			<div title={operation.paymentPurpose}>{operation.paymentPurpose}</div>
			<div>{operation.amount > 0 ? formatNumber(operation.amount) : ''}</div>
			<div>{operation.amount < 0 ? formatNumber(-operation.amount) : ''}</div>
		</div>
	)
}

export default Row
