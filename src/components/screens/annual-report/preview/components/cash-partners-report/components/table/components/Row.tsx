import cn from 'clsx'
import React from 'react'

import { IExtendedBankOperation } from '~/shared/types/annual.interface'

import {
	formatNumber,
	replaceAmountWithFakeIfFalse
} from '~/utils/number.utils'

import styles from '../table.module.scss'

interface OperationRowProps {
	operation: IExtendedBankOperation
	isReportPayed: boolean
}

const Row: React.FC<OperationRowProps> = ({ operation, isReportPayed }) => {
	return (
		<div className={`${styles.gridRow} ${styles.operationRow}`}>
			<div></div> {/* Заполнитель для иконки */}
			<div title={operation.paymentPurpose}>{operation.paymentPurpose}</div>
			<div>
				<p className={cn(styles.value, { [styles.blurred]: !isReportPayed })}>
					{operation.amount > 0
						? replaceAmountWithFakeIfFalse(
								formatNumber(operation.amount),
								isReportPayed
						  )
						: ''}
				</p>
			</div>
			<div>
				<p className={cn(styles.value, { [styles.blurred]: !isReportPayed })}>
					{operation.amount < 0
						? replaceAmountWithFakeIfFalse(
								formatNumber(-operation.amount),
								isReportPayed
						  )
						: ''}
				</p>
			</div>
		</div>
	)
}

export default Row
