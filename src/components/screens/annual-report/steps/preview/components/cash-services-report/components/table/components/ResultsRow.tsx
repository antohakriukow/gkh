import cn from 'clsx'
import { FC } from 'react'

import {
	formatNumber,
	replaceAmountWithFakeIfFalse
} from '~/utils/number.utils'

import { IResultsRow } from '../table.interface'
import styles from '../table.module.scss'

const ResultsRow: FC<IResultsRow> = ({
	accruals,
	income,
	costs,
	isReportPayed
}) => {
	return (
		<div className={cn(styles.gridRow)} style={{ fontWeight: 600 }}>
			<div></div> {/* Заполнитель для иконки */}
			<div>Итого</div>
			<div>
				<p className={cn({ [styles.blurred]: !isReportPayed })}>
					{replaceAmountWithFakeIfFalse(formatNumber(accruals), isReportPayed)}
				</p>
			</div>
			<div>
				<p className={cn({ [styles.blurred]: !isReportPayed })}>
					{replaceAmountWithFakeIfFalse(formatNumber(income), isReportPayed)}
				</p>
			</div>
			<div>
				<p className={cn({ [styles.blurred]: !isReportPayed })}>
					{replaceAmountWithFakeIfFalse(formatNumber(costs), isReportPayed)}
				</p>
			</div>
		</div>
	)
}

export default ResultsRow
