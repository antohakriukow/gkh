import TableHeader from './components/TableHeader'
import TableItem from './components/TableItem'
import { IRow, ITable } from './table.interface'
import { FC, useCallback, useMemo, useState } from 'react'

import styles from './Table.module.scss'

interface IFilters {
	[key: string]: string
}

// Первый элемент каждого массива строки должен быть _id
const Table: FC<ITable> = ({
	titles,
	rows,
	columnWidths,
	onClick,
	hasFilters,
	height
}) => {
	const [filters, setFilters] = useState<IFilters>({})

	const calculatedHeight = `calc(${height ? `${height}vh` : '100vh'} - 200px)`

	const handleFilterChange = useCallback(
		(title: string, value: string) => {
			setFilters({
				...filters,
				[title]: value
			})
		},
		[filters]
	)

	const lowerCaseFilters = Object.keys(filters).reduce((acc: IFilters, key) => {
		if (filters[key]) {
			acc[key] = filters[key].toLowerCase()
		}
		return acc
	}, {} as IFilters)

	const filteredRows = useMemo(() => {
		return rows.filter((row: IRow) => {
			return titles.every((title, index) => {
				if (!lowerCaseFilters[title]) return true
				const cellValue = row.data[index].toString().toLowerCase()
				return cellValue.includes(lowerCaseFilters[title])
			})
		})
	}, [rows, titles, lowerCaseFilters])

	return (
		<div className={styles.table}>
			<TableHeader
				titles={titles}
				columnWidths={columnWidths}
				onFilterChange={hasFilters ? handleFilterChange : undefined}
			/>
			<div className={styles.body} style={{ height: calculatedHeight }}>
				{(hasFilters ? filteredRows : rows).map(row => (
					<TableItem
						key={row._id}
						_id={row._id}
						data={row.data}
						onClick={onClick}
						columnWidths={columnWidths}
					/>
				))}
			</div>
		</div>
	)
}
export default Table
