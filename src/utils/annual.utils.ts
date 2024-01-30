import * as XLSX from 'xlsx'

import {
	IAccount,
	IAccountingOperation,
	IBankOperation
} from '~/shared/types/annual.interface'

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

const mapToBankOperation = (data: Record<string, string>): IBankOperation => ({
	documentNumber: data['Номер'],
	date: data['Дата'],
	amount: parseFloat(data['Сумма']),
	payerAccount: data['ПлательщикСчет'],
	payerName: data['Плательщик'],
	payerINN: data['ПлательщикИНН'],
	payerKPP: data['ПлательщикКПП'],
	payerCheckingAccount: data['ПлательщикРасчСчет'],
	recipientAccount: data['ПолучательСчет'],
	recipientName: data['Получатель'],
	recipientINN: data['ПолучательИНН'],
	recipientCheckingAccount: data['ПолучательРасчСчет'],
	budgetClassificationCode: data['ПоказательКБК'],
	paymentPriority: parseInt(data['Очередность']),
	paymentPurpose: data['НазначениеПлатежа']
})

export const parseTXTFile = async (
	file: File
): Promise<{
	operations: IBankOperation[]
	accounts: IAccount[]
}> => {
	const reader = new FileReader()
	reader.readAsArrayBuffer(file)

	return new Promise((resolve, reject) => {
		reader.onload = e => {
			if (!e.target) {
				reject('File read error')
				return
			}

			const buffer = e.target.result as ArrayBuffer
			const decoder = new TextDecoder('windows-1251') // или другая кодировка
			const text = decoder.decode(buffer)
			const lines = text.split('\n')

			// Проверка формата файла
			if (
				lines[0].trim() !== '1CClientBankExchange' ||
				lines[1].trim() !== 'ВерсияФормата=1.03'
			) {
				reject('Неверный формат файла')
				return
			}

			// Парсинг счетов

			const sectionIndex = lines.findIndex(
				line => line.trim() === 'СекцияРасчСчет'
			)

			const accounts = lines
				.slice(0, sectionIndex)
				.filter(line => line.startsWith('РасчСчет='))
				.map(line => ({
					type: undefined, // Тип счета, если он вам нужен, может быть добавлен здесь
					number: line.split('=')[1].trim()
				}))

			// Парсинг операций
			const operations: IBankOperation[] = []
			let currentOperation: Record<string, string> | null = null // Изменено на null для начального состояния
			lines.forEach(line => {
				if (line.startsWith('СекцияДокумент')) {
					currentOperation = {} // Начинаем новую операцию
				} else if (line.startsWith('КонецДокумента')) {
					if (currentOperation && Object.keys(currentOperation).length > 0) {
						operations.push(mapToBankOperation(currentOperation)) // Добавляем операцию, если она не пустая
					}
					currentOperation = null // Сбрасываем текущую операцию
				} else if (currentOperation) {
					const [key, value] = line.split('=')
					if (key && value) {
						currentOperation[key] = value.trim()
					}
				}
			})

			resolve({ operations, accounts })
		}

		reader.onerror = () => {
			reject(reader.error)
		}
	})
}
