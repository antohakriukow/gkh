import {
	getAccountRow,
	getCategory,
	getCategoryRow,
	getDetailRows,
	getDirectionTitle,
	getReportTableHeader,
	getReportTitle,
	getSignaturePlace,
	getTotalCategoryRow,
	getTotalRow
} from './rows'
import {
	directions,
	filterOperationsByAccount,
	getAccountsInDirection,
	getCategoryOperations,
	getGroupedByCompaniesIncomingOperations,
	getGroupedByCompaniesOutgoingOperations,
	getGroupedOperations
} from './utils'
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'

import {
	IAnnualCategory,
	IAnnualReport,
	IExtendedBankOperation,
	TypeDefinedAnnualDirection
} from '~/shared/types/annual.interface'

import { convertTimestampToDate } from '~/utils/time.utils'

export const downloadCashServicesReport = async (report: IAnnualReport) => {
	const operations = report.data.bankOperations ?? []
	const accounts = report.data.accounts ?? []

	// Создание книги и листа EXCEL
	const workbook = new ExcelJS.Workbook()
	const worksheet = workbook.addWorksheet('Отчет об исполнении сметы')

	// Определение ширины столбцов
	worksheet.getColumn(1).width = 45
	worksheet.getColumn(2).width = 15
	worksheet.getColumn(3).width = 15
	worksheet.getColumn(4).width = 15

	// Заголовок отчета
	getReportTitle(worksheet, report.company.name.short)

	// Разделение данных по направлениям
	const dataSeparatedByDirection = directions.map(direction => {
		const tableAccounts = getAccountsInDirection(accounts, direction)

		const tableOperations = operations.filter(
			operation => operation.direction === direction
		)

		const operationGroups = getGroupedOperations(tableOperations)

		const tableCategories =
			report.data.categories && direction
				? report.data.categories[direction]
				: []

		const tableAccruals = report?.data?.categories?.[
			direction as TypeDefinedAnnualDirection
		]?.reduce(
			(sum, category: IAnnualCategory) =>
				category.amount ? sum + category.amount : sum,
			0
		)

		return {
			direction,
			tableAccounts,
			tableOperations,
			tableCategories,
			tableAccruals,
			operationGroups
		}
	})

	dataSeparatedByDirection.map(data => {
		if (!data.operationGroups.incoming && !data.operationGroups.outgoing)
			return null

		// Пустая строка
		worksheet.addRow([])

		// Строка с названием направления
		getDirectionTitle(worksheet, data.direction)

		// Шапка таблицы
		getReportTableHeader(worksheet, data.direction)

		// Внесение данных по каждому счету в таблицу
		data.tableAccounts.map(tableAccount => {
			const accountOperations = filterOperationsByAccount(
				data.operationGroups,
				tableAccount.number
			)

			// Строка счёта (если счетов несколько и это не ЖКУ)
			if (data.tableAccounts.length > 1 || data.direction !== 'main') {
				const accountAccruals =
					data.tableCategories &&
					data.tableCategories.find(
						(category: IAnnualCategory) =>
							category.value.toString() === tableAccount.number.toString()
					)?.amount

				getAccountRow(
					worksheet,
					tableAccount,
					accountOperations,
					accountAccruals
				)
			}

			// Для ЖКУ при наличии статей затрат добавляем результирующие строки по каждой статье
			if (data.direction === 'main' && data.tableCategories) {
				const totalAccruals = data.tableCategories.reduce(
					(sum, cat) => (cat.amount ? sum + cat.amount : sum),
					0
				)

				data.tableCategories.map(category => {
					getTotalCategoryRow(worksheet, category, operations, totalAccruals)

					getCategory(worksheet, category, data.tableOperations, 1)
				})

				const otherIncome = data.tableOperations.filter(
					operation => operation.amount > 0 && operation.tag !== ''
				)

				const otherCosts = data.tableOperations.filter(
					operation => operation.amount < 0 && operation.categoryId === ''
				)

				if (otherIncome.length > 0 || otherCosts.length > 0)
					getTotalCategoryRow(
						worksheet,
						{ id: 10001, value: 'Прочие доходы и расходы' },
						data.tableOperations,
						0
					)

				getDetailRows(
					worksheet,
					{
						...getGroupedByCompaniesOutgoingOperations(otherCosts),
						...getGroupedByCompaniesIncomingOperations(otherIncome)
					},
					1
				)

				getTotalRow(worksheet, accountOperations, data.tableAccruals)
			}

			if (data.direction === 'target' || data.direction === 'renovation') {
				getDetailRows(
					worksheet,
					getGroupedByCompaniesIncomingOperations(
						getCategoryOperations(
							data.tableOperations.filter(
								operation =>
									operation.amount > 0 &&
									operation.recipientAccount === tableAccount.number
							),
							{
								id: 10002,
								value: 'Доходы'
							}
						)
					),
					1
				)

				getDetailRows(
					worksheet,
					getGroupedByCompaniesOutgoingOperations(
						getCategoryOperations(
							data.tableOperations.filter(
								operation =>
									operation.amount < 0 &&
									operation.payerAccount === tableAccount.number
							),
							{
								id: 10001,
								value: 'Расходы'
							}
						)
					),
					1
				)
			}
		})
	})

	// Добавление строк для подписи отчета
	getSignaturePlace(
		worksheet,
		report.company.leader_post,
		report.company.leader_name,
		convertTimestampToDate(+report.updatedAt)
	)

	// Генерация Excel файла и инициирование скачивания
	const buffer = await workbook.xlsx.writeBuffer()
	const blob = new Blob([buffer], {
		type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
	})
	saveAs(blob, 'ОИС.xlsx')
}
