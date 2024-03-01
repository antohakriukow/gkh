import * as XLSX from 'xlsx'

import { IAccount, IAccountingOperation } from '~/shared/types/annual.interface'

type HeaderMap = Record<string, keyof IAccountingOperation>

//prettier-ignore
const headerMap: HeaderMap = {
	'Дата': 'date',
	'Документ': 'document',
	'Счет Дт': 'debitAccount',
	'Субконто1 Дт': 'debitSubaccount1',
	'Субконто2 Дт': 'debitSubaccount2',
	'Субконто3 Дт': 'debitSubaccount3',
	'Счет Кт': 'creditAccount',
	'Субконто1 Кт': 'creditSubaccount1',
	'Субконто2 Кт': 'creditSubaccount2',
	'Субконто3 Кт': 'creditSubaccount3',
	'Сумма': 'amount',
	'Содержание': 'description'
}

/**
 * Функция для парсинга xlsx файла в массив объектов IAccountingOperation.
 * @param {File} file - xlsx файл для парсинга.
 * @returns {IAccountingOperation[]} Массив объектов IAccountingOperation.
 */
export const parseXLSXFile = (
	file: File
): Promise<{
	operations: IAccountingOperation[]
	accounts: IAccount[]
}> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.onload = (e: any) => {
			const data = new Uint8Array(e.target.result)
			const workbook = XLSX.read(data, { type: 'array' })
			const sheetName = workbook.SheetNames[0]
			const worksheet = workbook.Sheets[sheetName]
			const jsonData = XLSX.utils.sheet_to_json(worksheet, {
				header: 1
			}) as any[][]

			const headers = jsonData[0] as string[]
			const debitAccounts = new Set<string>()
			const operations: IAccountingOperation[] = jsonData.slice(1).map(row => {
				let operation: Partial<IAccountingOperation> = {}
				row.forEach((cell, index) => {
					const fieldName = headerMap[headers[index]]
					if (fieldName && cell) {
						// Нормализация даты
						if (fieldName === 'date') {
							operation[fieldName] = cell.split(' ')[0]
						} else {
							operation[fieldName] = cell
							if (fieldName === 'debitAccount') {
								debitAccounts.add(cell)
							}
						}
					}
				})

				return operation as IAccountingOperation
			})

			const accounts = Array.from(
				new Set(operations.map(op => op.debitAccount))
			)
				.filter(account => {
					if (account) {
						const firstPart = account.split('.')[0]
						return !['50', '51', '52', '53', '54', '55', '56'].includes(
							firstPart
						)
					}
					return false
				})
				.map(account => ({ type: undefined, number: account }))

			resolve({ operations, accounts })
		}
		reader.onerror = () => {
			reject(reader.error)
		}
		reader.readAsArrayBuffer(file)
	})
}
