import cn from 'clsx'
import { FC } from 'react'

import {
	formatNumber,
	replaceAmountWithFakeIfFalse
} from '~/utils/number.utils'

import styles from './table.module.scss'

const Cell: FC<{
	number?: number
	text?: string
	isReportPayed?: boolean
	showEmptyCellWhen?: boolean
}> = ({ number, text, isReportPayed = false, showEmptyCellWhen = false }) => {
	if (!!text) return <div title={text}>{text}</div>
	if (!number) return <div />

	return (
		<div>
			<p className={cn(styles.cell, { [styles.blurred]: !isReportPayed })}>
				{showEmptyCellWhen
					? ''
					: replaceAmountWithFakeIfFalse(formatNumber(number), isReportPayed)}
			</p>
		</div>
	)
}
export default Cell
