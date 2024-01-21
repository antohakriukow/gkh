export interface IRow {
	_id: string
	data: string[]
}

export interface ITable {
	titles: string[]
	rows: IRow[]
	columnWidths: number[]
	onClick: (_id: string) => void
	hasFilters?: boolean
	height?: number
}

export interface ITableHeader {
	titles: string[]
	columnWidths: number[]
	onFilterChange?: (title: string, value: string) => void
}

export interface ITableItem {
	_id: string
	data: string[]
	columnWidths: number[]
	onClick: (_id: string) => void
}
