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
	const isIncome = operation.amount > 0
	return (
		<div className={`${styles.gridRow} ${styles.operationRow}`}>
			<div></div> {/* Заполнитель для иконки */}
			<div>{operation.paymentPurpose}</div>
			<div></div>
			<div>
				<p className={cn({ [styles.blurred]: !isReportPayed })}>
					{isIncome
						? replaceAmountWithFakeIfFalse(
								formatNumber(operation.amount),
								isReportPayed
						  )
						: ''}
				</p>
			</div>
			<div>
				<p className={cn({ [styles.blurred]: !isReportPayed })}>
					{isIncome
						? ''
						: replaceAmountWithFakeIfFalse(
								formatNumber(operation.amount),
								isReportPayed
						  )}
				</p>
			</div>
		</div>
	)
}

export default Row
