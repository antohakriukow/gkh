export interface ITable {
	titles: string[]
	rows: string[][]
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
	data: string[]
	columnWidths: number[]
	onClick: (_id: string) => void
}
