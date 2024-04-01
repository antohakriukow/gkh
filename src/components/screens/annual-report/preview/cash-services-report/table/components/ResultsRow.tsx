import { FC } from 'react'

import { Cell } from '../../../shared'
import styles from '../../../shared/table-parts/table.module.scss'
import { IResultsRowProps } from '../table.interface'

const ResultsRow: FC<IResultsRowProps> = ({
	accruals,
	income,
	costs,
	isReportPayed
}) => {
	return (
		<div className={styles.row} style={{ fontWeight: 600 }}>
			<Cell />
			<Cell text='Итого' />
			<Cell number={+accruals} isReportPayed={isReportPayed} />
			<Cell number={+income} isReportPayed={isReportPayed} />
			<Cell number={+costs} isReportPayed={isReportPayed} />
		</div>
	)
}

export default ResultsRow
