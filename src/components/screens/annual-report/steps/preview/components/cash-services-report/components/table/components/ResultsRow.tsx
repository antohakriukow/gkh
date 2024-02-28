import cn from 'clsx'
import { FC } from 'react'

import { formatNumber } from '~/utils/number.utils'

import { IResultsRow } from '../table.interface'
import styles from '../table.module.scss'

const ResultsRow: FC<IResultsRow> = ({ accruals, income, costs }) => {
	return (
		<div className={cn(styles.gridRow)} style={{ fontWeight: 600 }}>
			<div></div> {/* Заполнитель для иконки */}
			<div>Итого</div>
			<div>{formatNumber(accruals)}</div>
			<div>{formatNumber(income)}</div>
			<div>{formatNumber(costs)}</div>
		</div>
	)
}

export default ResultsRow
