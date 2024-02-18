import ExcelJS from 'exceljs'

const isAlignCenter = {
	alignment: {
		horizontal: 'center',
		vertical: 'middle'
	}
}

const isAlignLeft = {
	alignment: {
		horizontal: 'left',
		vertical: 'middle'
	}
}

const hasBorder = {
	border: {
		top: { style: 'thin' },
		left: { style: 'thin' },
		bottom: { style: 'thin' },
		right: { style: 'thin' }
	}
}

const hasFilling = {
	fill: {
		type: 'pattern',
		pattern: 'solid',
		fgColor: { argb: 'c9cee8' }
	}
}

const isNum = { numFmt: '#,##0.00;-#,##0.00' }

export const isBold = { font: { bold: true } } as Partial<ExcelJS.Style>

export const isBoldAndCentered = {
	...isBold,
	...isAlignCenter
} as Partial<ExcelJS.Style>

export const firstSimpleCell = {
	...hasBorder,
	...isAlignLeft
} as Partial<ExcelJS.Style>

export const simpleCell = {
	...firstSimpleCell,
	...isAlignCenter,
	...isNum
} as Partial<ExcelJS.Style>

export const firstResultCell = {
	...firstSimpleCell,
	...isBold
} as Partial<ExcelJS.Style>

export const resultCell = {
	...simpleCell,
	...isBold
} as Partial<ExcelJS.Style>

export const firstHeaderCell = {
	...firstResultCell,
	...hasFilling
} as Partial<ExcelJS.Style>

export const headerCell = {
	...firstHeaderCell,
	...isAlignCenter
} as Partial<ExcelJS.Style>
