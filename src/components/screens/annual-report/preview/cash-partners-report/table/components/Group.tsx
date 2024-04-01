import Row from './Row'
import { FC, useState } from 'react'

import { trimStringAtSymbol } from '~/utils/string.utils'

import { Cell, CellWithToggle } from '../../../shared'
import styles from '../../../shared/table-parts/table.module.scss'
import { IOperationGroupProps } from '../table.interface'

const Group: FC<IOperationGroupProps> = ({ group, isReportPayed }) => {
	const [expanded, setExpanded] = useState(false)
	const toggleActive = () => setExpanded(!expanded)

	return (
		<>
			<div data-inn={group.INN} className={styles.row}>
				<CellWithToggle isActive={expanded} toggleActive={toggleActive} />
				<Cell text={trimStringAtSymbol(group.name, '//')} />
				<Cell
					number={group.total}
					isReportPayed={isReportPayed}
					showEmptyCellWhen={group.total < 0}
				/>
				<Cell
					number={-group.total}
					isReportPayed={isReportPayed}
					showEmptyCellWhen={group.total > 0}
				/>
			</div>
			{expanded &&
				group.operations.map(operation => (
					<Row
						key={operation._id}
						operation={operation}
						isReportPayed={isReportPayed}
					/>
				))}
		</>
	)
}

export default Group
