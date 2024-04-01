import { FC } from 'react'

import { Cell, CellWithToggle } from '../../../shared'
import styles from '../../../shared/table-parts/table.module.scss'
import { IResultRowProps } from '../table.interface'

const ResultRow: FC<IResultRowProps> = ({
	toggleGroup,
	isReportPayed,
	typeKey,
	total,
	expanded
}) => {
	const toggleActive = () => toggleGroup(typeKey)
	const resultRowText = `${
		typeKey === 'incoming' ? 'Доходы' : 'Расходы'
	}, всего:`
	return (
		<div className={styles.row}>
			<CellWithToggle isActive={expanded} toggleActive={toggleActive} />
			<Cell text={resultRowText} />
			<Cell
				number={total}
				isReportPayed={isReportPayed}
				showEmptyCellWhen={total < 0}
			/>
			<Cell
				number={-total}
				isReportPayed={isReportPayed}
				showEmptyCellWhen={total > 0}
			/>
		</div>
	)
}
export default ResultRow
