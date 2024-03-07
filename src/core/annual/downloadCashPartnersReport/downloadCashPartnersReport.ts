import {
	firstHeaderCell,
	firstResultCell,
	firstSimpleCell,
	headerCell,
	isBold,
	isBoldAndCentered,
	resultCell,
	simpleCell
} from './styles'
import {
	directions,
	filterOperationsByAccount,
	getAccountRow,
	getAccountsInDirection,
	getCompanyRow,
	getGroupedOperations,
	getOperationRow,
	getTotalOperationsRow,
	tableHeader
} from './utils'
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'

import { IAnnualReport } from '~/shared/types/annual.interface'

import { convertTimestampToDate } from '~/utils/time.utils'

import { getAnnualDirectionTitle } from '../shared'

export const downloadCashPartnersReport = async (report: IAnnualReport) => {
	const operations = report.data.bankOperations ?? []
	const accounts = report.data.accounts ?? []

	// Создание книги и листа EXCEL
	const workbook = new ExcelJS.Workbook()
	const worksheet = workbook.addWorksheet('Отчет об исполнении сметы')

	// Заголовок отчета
	worksheet.addRow([])
	const titleRow = worksheet.addRow([
		`Отчет об исполнении сметы доходов и расходов ${report.company.name.short}`
	])
	titleRow.getCell(1).style = isBold

	// Определение ширины столбцов
	worksheet.getColumn(1).width = 60
	worksheet.getColumn(2).width = 15
	worksheet.getColumn(3).width = 15

	// Разделение данных по направлениям
	const dataSeparatedByDirection = directions.map(direction => {
		const tableAccounts = getAccountsInDirection(accounts, direction)

		const operationGroups = getGroupedOperations(
			operations.filter(operation => operation.direction === direction)
		)

		return {
			direction,
			tableAccounts,
			operationGroups
		}
	})

	dataSeparatedByDirection.map(data => {
		if (!data.operationGroups.incoming && !data.operationGroups.outgoing)
			return null

		// Пустая строка
		worksheet.addRow([])

		// Строка с названием направления
		const directionRow = worksheet.addRow([
			getAnnualDirectionTitle(data.direction)
		])
		directionRow.getCell(1).style = isBold

		// Шапка таблицы
		const tableHeaderRow = worksheet.addRow(tableHeader)
		tableHeaderRow.getCell(1).style = firstHeaderCell
		tableHeaderRow.getCell(2).style = headerCell
		tableHeaderRow.getCell(3).style = headerCell

		// Внесение данных по каждому счету в таблицу
		data.tableAccounts.map(tableAccount => {
			const accountOperations = filterOperationsByAccount(
				data.operationGroups,
				tableAccount.number
			)

			// Строка счёта (если счетов несколько)
			if (data.tableAccounts.length > 1) {
				const accountRow = worksheet.addRow(
					getAccountRow(accountOperations, tableAccount)
				)
				accountRow.getCell(1).style = firstResultCell
				accountRow.getCell(2).style = resultCell
				accountRow.getCell(3).style = resultCell
			}

			// Блоки доходов и расходов
			;[accountOperations.incoming, accountOperations.outgoing].map(
				groupedOperations => {
					// Для всех направлений кроме капремонта добавляем строки "Доходы, всего" и "Расходы, всего"
					if (
						groupedOperations.total !== 0 &&
						data.direction !== 'renovation' &&
						data.tableAccounts.length === 1
					) {
						const totalRow = worksheet.addRow(
							getTotalOperationsRow(groupedOperations)
						)
						totalRow.outlineLevel = 0
						totalRow.getCell(1).style = firstResultCell
						totalRow.getCell(2).style = resultCell
						totalRow.getCell(3).style = resultCell
					}

					// Группы операций
					Object.values(groupedOperations.groups)
						.sort((a, b) => Math.abs(b.total) - Math.abs(a.total))
						.map((group, index) => {
							// Строка контрагента
							const companyRow = worksheet.addRow(
								getCompanyRow(group.name, group.total)
							)
							companyRow.outlineLevel = 1
							companyRow.hidden = group.total > 0
							companyRow.getCell(1).style = firstSimpleCell
							companyRow.getCell(2).style = simpleCell
							companyRow.getCell(3).style = simpleCell

							// Строки операций
							group.operations.map(operation => {
								const operationRow = worksheet.addRow(
									getOperationRow(operation)
								)
								operationRow.outlineLevel = 2
								operationRow.hidden = true
								operationRow.getCell(1).style = firstSimpleCell
								operationRow.getCell(2).style = simpleCell
								operationRow.getCell(3).style = simpleCell
							})

							if (
								index ===
								Object.values(groupedOperations.groups).length - 1
							) {
								const emptyRow = worksheet.addRow([''])
								emptyRow.outlineLevel = 1
								emptyRow.getCell(1).style = simpleCell
								emptyRow.getCell(2).style = simpleCell
								emptyRow.getCell(3).style = simpleCell
								// emptyRow.height = 0.1
								// emptyRow.hidden = true
							}
						})
				}
			)
		})
	})

	// Добавление строк для подписи отчета
	worksheet.addRow([])
	worksheet.addRow([`${report.company.leader_post}`])
	worksheet.addRow([`${report.company.leader_name} __________________`, ''])
	worksheet.addRow([`М.П.`])
	worksheet.addRow([
		`Дата составления: ${convertTimestampToDate(+report.updatedAt)}`
	])

	// Генерация Excel файла и инициирование скачивания
	const buffer = await workbook.xlsx.writeBuffer()
	const blob = new Blob([buffer], {
		type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
	})
	saveAs(blob, 'ОИС.xlsx')
}
