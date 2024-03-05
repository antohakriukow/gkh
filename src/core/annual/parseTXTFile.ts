import { IAccount, IBankOperation } from '~/shared/types/annual.interface'

const mapToBankOperation = (data: Record<string, string>): IBankOperation => ({
	documentNumber: data['Номер'] ?? '',
	date: data['Дата'] ?? '',
	amount: parseFloat(data['Сумма']) ?? '',
	payerAccount: data['ПлательщикСчет'] ?? '',
	payerName: data['Плательщик'] ?? '',
	payerINN: data['ПлательщикИНН'] ?? '',
	payerKPP: data['ПлательщикКПП'] ?? '',
	payerCheckingAccount: data['ПлательщикРасчСчет'] ?? '',
	recipientAccount: data['ПолучательСчет'] ?? '',
	recipientName: data['Получатель'] ?? '',
	recipientINN: data['ПолучательИНН'] ?? '',
	recipientCheckingAccount: data['ПолучательРасчСчет'] ?? '',
	budgetClassificationCode: data['ПоказательКБК'] ?? '',
	paymentPriority: parseInt(data['Очередность']) ?? '',
	paymentPurpose: data['НазначениеПлатежа'] ?? ''
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
