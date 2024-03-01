import { FC } from 'react'
import React from 'react'

import { debounce } from '~/utils/debounce'

import styles from '../Table.module.scss'
import { ITableHeader } from '../table.interface'

const TableHeader: FC<ITableHeader> = ({
	titles,
	columnWidths,
	onFilterChange
}) => {
	const gridTemplateColumns = columnWidths.map(width => `${width}fr`).join(' ')

	const debouncedFilterChange = onFilterChange
		? debounce(onFilterChange, 500)
		: () => {}

	return (
		<div className={styles.header} style={{ gridTemplateColumns }}>
			{titles.map(title => (
				<div key={title}>
					<p className={styles.title}>{title}</p>
					{onFilterChange && (
						<input
							className={styles.input}
							type='text'
							onChange={e => debouncedFilterChange(title, e.target.value)}
							placeholder={`Поиск по ${title}`}
						/>
					)}
				</div>
			))}
		</div>
	)
}

export default React.memo(TableHeader)
