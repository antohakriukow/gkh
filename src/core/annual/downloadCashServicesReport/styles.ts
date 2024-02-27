import ExcelJS from 'exceljs'

interface IAlignment {
	alignment: {
		horizontal: string
		vertical: string
		indent?: number
	}
}

const isAlignCenter = {
	alignment: {
		horizontal: 'center',
		vertical: 'middle'
	}
}

const isAlignLeft = (paddingLeft?: number) => {
	const style = {
		alignment: {
			horizontal: 'left',
			vertical: 'middle'
		}
	} as IAlignment
	if (paddingLeft) {
		style.alignment.indent = paddingLeft
	}

	return style
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

export const firstSimpleCell = (paddingLeft?: number) =>
	({
		...hasBorder,
		...isAlignLeft(paddingLeft)
	}) as Partial<ExcelJS.Style>

export const simpleCell = {
	...firstSimpleCell(),
	...isAlignCenter,
	...isNum
} as Partial<ExcelJS.Style>

export const firstResultCell = (paddingLeft?: number) => {
	const style = {
		...firstSimpleCell(paddingLeft),
		...isBold
	} as Partial<ExcelJS.Style>

	if (style.alignment) style.alignment.wrapText = true

	return style
}

export const resultCell = {
	...simpleCell,
	...isBold
} as Partial<ExcelJS.Style>

export const firstHeaderCell = {
	...firstResultCell(),
	...hasFilling
} as Partial<ExcelJS.Style>

export const headerCell = {
	...firstHeaderCell,
	...isAlignCenter
} as Partial<ExcelJS.Style>
