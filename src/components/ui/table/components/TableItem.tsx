import React, { FC } from 'react'
import { Tooltip } from 'react-tooltip'

import styles from '../Table.module.scss'
import { ITableItem } from '../table.interface'

const TableItem: FC<ITableItem> = ({ _id, data, columnWidths, onClick }) => {
	const gridTemplateColumns = columnWidths.map(width => `${width}fr`).join(' ')

	return (
		<div
			onClick={() => onClick(_id)}
			className={styles.item}
			style={{ gridTemplateColumns }}
		>
			{data.map((item, index) => (
				<div
					key={index}
					className={styles.cell}
					data-tooltip-id={`cellTooltip-${index}-${item}`}
					data-tooltip-content={item}
					data-tooltip-place='bottom'
				>
					<p className={styles.text}>{item}</p>
					<Tooltip id={`cellTooltip-${index}-${item}`} delayShow={2000} />
				</div>
			))}
		</div>
	)
}
export default React.memo(TableItem)
