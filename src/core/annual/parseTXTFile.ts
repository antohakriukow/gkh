import { IAccount, IBankOperation } from '~/shared/types/annual.interface'

const mapToBankOperation = (data: Record<string, string>): IBankOperation => ({
	documentNumber: data['Номер'] ?? 'НЕТ',
	date: data['Дата'] ?? 'НЕТ',
	amount: parseFloat(data['Сумма']) ?? '0.00',
	payerAccount: data['ПлательщикСчет'] ?? '0000',
	payerName: data['Плательщик'] ?? 'НАИМЕНОВАНИЕ ОТСУТСТВУЕТ',
	payerINN: data['ПлательщикИНН'] ?? '0000',
	payerKPP: data['ПлательщикКПП'] ?? '0000',
	payerCheckingAccount: data['ПлательщикРасчСчет'] ?? '0000',
	recipientAccount: data['ПолучательСчет'] ?? '0001',
	recipientName: data['Получатель'] ?? 'НАИМЕНОВАНИЕ ОТСУТСТВУЕТ',
	recipientINN: data['ПолучательИНН'] ?? '0001',
	recipientCheckingAccount: data['ПолучательРасчСчет'] ?? '0001',
	budgetClassificationCode: data['ПоказательКБК'] ?? '',
	paymentPriority: parseInt(data['Очередность']) ?? '',
	paymentPurpose: data['НазначениеПлатежа'] ?? 'НАЗНАЧЕНИЕ ПЛАТЕЖА ОТСУТСТВУЕТ'
})

export const parseTXTFile = async (
	file: File
): Promise<{
	operations: IBankOperation[]
	accounts: IAccount[]
	companyName: string
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

			//Парсинг имени компании
			const companyName = accounts
				.map(acc => acc.number)
				.includes(operations[0].payerAccount)
				? operations[0].payerName
				: operations[0].recipientName

			resolve({ operations, accounts, companyName })
		}

		reader.onerror = () => {
			reject(reader.error)
		}
	})
}
