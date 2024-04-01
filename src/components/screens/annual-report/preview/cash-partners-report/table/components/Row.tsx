import { FC } from 'react'

import { Cell } from '../../../shared'
import styles from '../../../shared/table-parts/table.module.scss'
import { IRowProps } from '../table.interface'

const Row: FC<IRowProps> = ({ operation, isReportPayed }) => {
	return (
		<div className={styles.row}>
			<Cell />
			<Cell text={operation.paymentPurpose} />
			<Cell
				number={operation.amount}
				isReportPayed={isReportPayed}
				showEmptyCellWhen={operation.amount < 0}
			/>
			<Cell
				number={-operation.amount}
				isReportPayed={isReportPayed}
				showEmptyCellWhen={operation.amount > 0}
			/>
		</div>
	)
}

export default Row
