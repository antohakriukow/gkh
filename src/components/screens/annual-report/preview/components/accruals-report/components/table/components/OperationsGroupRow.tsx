import cn from 'clsx'
import { FC } from 'react'

import { IExtendedAccountingOperation } from '~/shared/types/annual.interface'

import styles from '../table.module.scss'

const OperationsGroupRow: FC<{
	operations: IExtendedAccountingOperation[]
	isReportPayed: boolean
}> = ({ operations, isReportPayed }) => {
	return (
		<div className={cn(styles.gridRow)} style={{ fontWeight: 600 }}>
			<div></div> {/* Заполнитель для иконки */}
			<div></div>
			<div>
				<p className={cn(styles.value, { [styles.blurred]: !isReportPayed })}>
					{/* {replaceAmountWithFakeIfFalse(formatNumber(costs), isReportPayed)} */}
				</p>
			</div>
			<div>
				<p className={cn(styles.value, { [styles.blurred]: !isReportPayed })}>
					{/* {replaceAmountWithFakeIfFalse(formatNumber(accruals), isReportPayed)} */}
				</p>
			</div>
		</div>
	)
}

export default OperationsGroupRow
