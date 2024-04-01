import {
	firstHeaderCell,
	firstResultCell,
	firstSimpleCell,
	headerCell,
	isBold,
	resultCell,
	simpleCell
} from './styles'
import { ICompanyOperations, IGroupedOperations } from './types'
import {
	calculateMainIncomePart,
	calculateOperationsSum,
	getCategoryOperations,
	getGroupedByCompaniesOutgoingOperations
} from './utils'
import ExcelJS from 'exceljs'

import {
	IAccount,
	IAnnualCategory,
	IExtendedBankOperation,
	TypeAnnualDirection
} from '~/shared/types/annual.interface'

import { getAnnualDirectionTitle } from '~/utils/annual.utils'
import { trimStringAtSymbol } from '~/utils/string.utils'

export const getReportTitle = (
	worksheet: ExcelJS.Worksheet,
	companyName: string
) => {
	const row = worksheet.addRow([
		`Отчет об исполнении сметы доходов и расходов ${companyName}`
	])
	row.getCell(1).style = isBold
}

export const getDirectionTitle = (
	worksheet: ExcelJS.Worksheet,
	direction: TypeAnnualDirection
) => {
	const row = worksheet.addRow([getAnnualDirectionTitle(direction)])
	row.getCell(1).style = isBold
}

export const getReportTableHeader = (
	worksheet: ExcelJS.Worksheet,
	direction: TypeAnnualDirection
) => {
	const row = worksheet.addRow([
		direction === 'main' ? 'Услуга' : 'Счет',
		'Начислено, руб.',
		'Доходы, руб.',
		'Расходы, руб.'
	])
	row.getCell(1).style = firstHeaderCell
	row.getCell(2).style = headerCell
	row.getCell(3).style = headerCell
	row.getCell(4).style = headerCell
}

export const getAccountRow = (
	worksheet: ExcelJS.Worksheet,
	account: IAccount,
	operations: IGroupedOperations,
	accruals?: number
) => {
	const row = worksheet.addRow([
		`Счет  № ${account.number}`,
		accruals ? accruals : '',
		operations.incoming.total !== 0 ? operations.incoming.total : '',
		operations.outgoing.total !== 0 ? operations.outgoing.total : ''
	])
	row.getCell(1).style = firstResultCell()
	row.getCell(2).style = resultCell
	row.getCell(3).style = resultCell
	row.getCell(4).style = resultCell
}

export const getTotalCategoryRow = (
	worksheet: ExcelJS.Worksheet,
	category: IAnnualCategory,
	operations: IExtendedBankOperation[],
	totalAccruals: number,
	level: number = 0
) => {
	const row = worksheet.addRow([
		category.value,
		category.amount,
		Number(category.id) > 10000
			? calculateOperationsSum(
					operations.filter(
						operation => operation.amount > 0 && operation.tag !== ''
					)
			  )
			: calculateMainIncomePart(
					operations.filter(operation => operation.amount > 0),
					category,
					totalAccruals
			  ),
		calculateOperationsSum(
			getCategoryOperations(
				operations.filter(operation => operation.amount < 0),
				category
			)
		)
	])
	row.outlineLevel = level
	row.getCell(1).style = firstResultCell()
	row.getCell(2).style = resultCell
	row.getCell(3).style = resultCell
	row.getCell(4).style = resultCell
}

export const getTotalAccountRow = (
	worksheet: ExcelJS.Worksheet,
	category: IAnnualCategory,
	operations: IExtendedBankOperation[],
	totalAccruals: number,
	level: number = 0
) => {
	const row = worksheet.addRow([
		category.value,
		totalAccruals,
		operations.reduce((sum, op) => (op.amount > 0 ? sum + op.amount : sum), 0),
		operations.reduce((sum, op) => (op.amount < 0 ? sum + op.amount : sum), 0)
	])
	row.outlineLevel = level
	row.getCell(1).style = firstResultCell()
	row.getCell(2).style = resultCell
	row.getCell(3).style = resultCell
	row.getCell(4).style = resultCell
}

export const getCategoryRow = (
	worksheet: ExcelJS.Worksheet,
	category: IAnnualCategory,
	operations: IExtendedBankOperation[],
	level?: number
) => {
	const totalCategoryRow = worksheet.addRow([
		category.value,
		'',
		'',
		calculateOperationsSum(
			getCategoryOperations(
				operations.filter(operation => operation.amount < 0),
				category
			)
		)
	])
	totalCategoryRow.outlineLevel = level ?? 0
	totalCategoryRow.getCell(1).style = firstResultCell(level)
	totalCategoryRow.getCell(2).style = resultCell
	totalCategoryRow.getCell(3).style = resultCell
	totalCategoryRow.getCell(4).style = resultCell
}

export const getCompanyRow = (
	worksheet: ExcelJS.Worksheet,
	companyName: string,
	totalAmount: number,
	level?: number
) => {
	const row = worksheet.addRow([
		trimStringAtSymbol(companyName, '//'),
		'',
		totalAmount > 0 ? totalAmount : '',
		totalAmount < 0 ? totalAmount : ''
	])
	row.outlineLevel = level
	row.hidden = true
	row.getCell(1).style = level ? firstSimpleCell(level) : firstSimpleCell()
	row.getCell(2).style = simpleCell
	row.getCell(3).style = simpleCell
	row.getCell(4).style = simpleCell

	return row
}

export const getOperationRow = (
	worksheet: ExcelJS.Worksheet,
	operation: IExtendedBankOperation,
	level?: number
) => {
	const row = worksheet.addRow([
		operation.paymentPurpose,
		'',
		operation.amount > 0 ? operation.amount : '',
		operation.amount > 0 ? '' : operation.amount
	])
	row.outlineLevel = level
	row.hidden = true
	row.getCell(1).style = level ? firstSimpleCell(level + 1) : firstSimpleCell()
	row.getCell(2).style = simpleCell
	row.getCell(3).style = simpleCell
	row.getCell(4).style = simpleCell

	return row
}

export const getDetailRows = (
	worksheet: ExcelJS.Worksheet,
	companyGroups: ICompanyOperations,
	level: number = 0
) => {
	Object.values(companyGroups)
		.sort((a, b) => Math.abs(b.total) - Math.abs(a.total))
		.forEach((group, index) => {
			const companyRow = getCompanyRow(
				worksheet,
				group.name,
				group.total,
				level + 1
			)
			companyRow.outlineLevel = level

			group.operations.forEach((operation, operationIndex) => {
				getOperationRow(worksheet, operation, level + 1)
			})
			if (index === Object.values(companyGroups).length - 1)
				getEmptyRow(worksheet, level)
		})
}

export const getCategory = (
	worksheet: ExcelJS.Worksheet,
	category: IAnnualCategory,
	operations: IExtendedBankOperation[],
	level: number
) => {
	if (category.children && category.children.length > 0) {
		category.children.forEach((child, index) => {
			getCategoryRow(worksheet, child, operations, level)
			getCategory(worksheet, child, operations, level + 1)
		})
	} else {
		getDetailRows(
			worksheet,
			getGroupedByCompaniesOutgoingOperations(
				getCategoryOperations(operations, category)
			),
			level
		)
	}
}

export const getTotalRow = (
	worksheet: ExcelJS.Worksheet,
	operations: IGroupedOperations,
	accruals?: number
) => {
	const row = worksheet.addRow([
		`Итого`,
		accruals ? accruals : '',
		operations.incoming.total !== 0 ? operations.incoming.total : '',
		operations.outgoing.total !== 0 ? operations.outgoing.total : ''
	])
	row.getCell(1).style = firstResultCell()
	row.getCell(2).style = resultCell
	row.getCell(3).style = resultCell
	row.getCell(4).style = resultCell
}

export const getSignaturePlace = (
	worksheet: ExcelJS.Worksheet,
	leaderPost: string,
	leaderName: string,
	date: string
) => {
	worksheet.addRow([])
	worksheet.addRow([`${leaderPost}`])
	worksheet.addRow([`${leaderName} __________________`, ''])
	worksheet.addRow([`М.П.`])
	worksheet.addRow([`Дата составления: ${date}`])
}

const getEmptyRow = (worksheet: ExcelJS.Worksheet, level: number) => {
	const emptyRow = worksheet.addRow([''])
	emptyRow.outlineLevel = level
	emptyRow.hidden = true
	emptyRow.getCell(1).style = simpleCell
	emptyRow.getCell(2).style = simpleCell
	emptyRow.getCell(3).style = simpleCell
	emptyRow.getCell(4).style = simpleCell
}
