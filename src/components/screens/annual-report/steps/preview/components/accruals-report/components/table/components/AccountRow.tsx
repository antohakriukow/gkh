import cn from 'clsx'
import { FC, Fragment } from 'react'
import { getAnnualDirectionTitle } from '~/core/annual/shared'

import {
	formatNumber,
	replaceAmountWithFakeIfFalse
} from '~/utils/number.utils'

import { IAccountRow, TypeLevel } from '../table.interface'
import styles from '../table.module.scss'
import { useAccrualsTable } from '../useAccrualsTable'

const AccountRow: FC<IAccountRow> = ({
	accruals,
	costs,
	operations,
	isReportPayed,
	account,
	direction,
	accounts,
	level
}) => {
	return (
		<div className={cn(styles.gridRow)} style={{ fontWeight: 600 }}>
			<div></div> {/* Заполнитель для иконки */}
			<div>{account ? account : getAnnualDirectionTitle(direction)}</div>
			<div>
				<p className={cn(styles.value, { [styles.blurred]: !isReportPayed })}>
					{replaceAmountWithFakeIfFalse(formatNumber(costs), isReportPayed)}
				</p>
			</div>
			<div>
				<p className={cn(styles.value, { [styles.blurred]: !isReportPayed })}>
					{replaceAmountWithFakeIfFalse(formatNumber(accruals), isReportPayed)}
				</p>
			</div>
		</div>
	)
}
export default AccountRow
