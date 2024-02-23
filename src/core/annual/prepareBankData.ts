import {
	IAccount,
	IBankOperation,
	IExtendedBankOperation,
	TypeAnnualDirection,
	TypeAnnualOperationTag
} from '~/shared/types/annual.interface'

/**
 * Разделяет массив банковских операций на внутренние переводы между собственными счетами и все остальные операции.
 *
 * @param operations - массив банковских операций.
 * @param accounts - массив счетов, принадлежащих пользователю.
 * @returns Объект с двумя массивами: internalOperations для внутренних переводов и externalOperations для внешних операций.
 */
const separateOperations = (
	operations: IBankOperation[],
	accounts: IAccount[]
) => {
	const internalOperationsMap = new Map<string, IBankOperation>()
	const externalOperations: IBankOperation[] = []

	operations.forEach(operation => {
		const isInternalTransfer =
			operation.payerINN === operation.recipientINN &&
			accounts.some(
				account =>
					account.number === operation.payerAccount ||
					account.number === operation.recipientAccount
			)

		const operationKey = `${operation.documentNumber}-${operation.date}-${operation.amount}`

		if (isInternalTransfer) {
			if (!internalOperationsMap.has(operationKey)) {
				internalOperationsMap.set(operationKey, operation)
			}
		} else {
			externalOperations.push(operation)
		}
	})

	const internalOperations = Array.from(internalOperationsMap.values())

	return { internalOperations, externalOperations }
}

const setTag = (string: string): TypeAnnualOperationTag => {
	if (string.toLowerCase().includes('аренд')) return 'commercialIncome'
	if (string.toLowerCase().includes('возврат')) return 'partnerCashback'
	if (
		string.toLowerCase().includes('процент') ||
		string.toLowerCase().includes('%%')
	)
		return 'percents'
}

/**
 * Обрабатывает массив внешних банковских операций, преобразуя каждую операцию в формат IOperation.
 *
 * @param operations - массив внешних банковских операций.
 * @param accounts - массив счетов, принадлежащих пользователю.
 * @returns Массив объектов IOperation, полученных из внешних банковских операций.
 */
const processExternalOperations = (
	operations: IBankOperation[],
	accounts: IAccount[]
): IExtendedBankOperation[] => {
	return operations.map((operation, index) => {
		const isIncome = accounts.some(
			account => account.number === operation.recipientAccount
		)

		const response = {
			...operation,
			_id: index.toString(),
			categoryId: '',
			amount: isIncome ? operation.amount : -operation.amount,
			direction: isIncome
				? setDirection(accounts, operation.recipientAccount)
				: setDirection(accounts, operation.payerAccount)
		}

		if (!!setTag(response.paymentPurpose))
			response.tag = setTag(response.paymentPurpose)

		return response
	})
}

/**
 * Обрабатывает массив внутренних переводов между собственными счетами, создавая две операции для каждого перевода: списание и поступление.
 *
 * @param internalOperations - массив внутренних банковских переводов.
 * @param accounts - массив счетов, принадлежащих пользователю.
 * @returns Массив объектов IOperation, представляющих внутренние переводы как списание и поступление средств.
 */
const processInternalOperations = (
	internalOperations: IBankOperation[],
	accounts: IAccount[]
): IExtendedBankOperation[] => {
	let operations: IExtendedBankOperation[] = []

	internalOperations.forEach((transfer, index) => {
		const baseId = index * 2
		operations.push({
			...transfer,
			_id: baseId.toString(),
			categoryId: '',
			amount: -transfer.amount,
			direction: setDirection(accounts, transfer.payerAccount),
			tag: 'internal'
		})

		operations.push({
			...transfer,
			_id: (baseId + 1).toString(),
			categoryId: '',
			amount: transfer.amount,
			date: transfer.date,
			direction: setDirection(accounts, transfer.recipientAccount)
		})
	})

	return operations
}

/**
 * Определяет направление операции на основе номера счета, участвующего в операции.
 *
 * @param accounts - массив счетов, принадлежащих пользователю.
 * @param accountNumber - номер счета, использованный в операции.
 * @returns Направление операции в виде строки TypeAnnualDirection, соответствующее типу счета.
 */
const setDirection = (
	accounts: IAccount[],
	accountNumber: string
): TypeAnnualDirection => {
	const account = accounts.find(account => account.number === accountNumber)

	return account ? account.type : ''
}

/**
 * Интегрирует и обрабатывает банковские операции, разделяя их на внутренние переводы и внешние операции,
 * преобразуя их в унифицированный формат IOperation.
 *
 * @param operations - массив банковских операций для обработки.
 * @param accounts - массив счетов, принадлежащих пользователю.
 * @returns Массив унифицированных операций IOperation, включающий как внешние операции, так и внутренние переводы.
 */
export const unifyBankOperations = (
	operations: IBankOperation[],
	accounts: IAccount[]
): IExtendedBankOperation[] => {
	const { internalOperations, externalOperations } = separateOperations(
		operations,
		accounts
	)

	let processedExternalOperations = processExternalOperations(
		externalOperations,
		accounts
	)

	let processedInternalTransfers = processInternalOperations(
		internalOperations,
		accounts
	)

	const processedOperations = [
		...processedExternalOperations,
		...processedInternalTransfers
	]

	return processedOperations.map((operation, index) => ({
		...operation,
		_id: index.toString()
	}))
}
