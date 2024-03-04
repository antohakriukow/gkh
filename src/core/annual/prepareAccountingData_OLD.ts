import {
	IAccount,
	IAccountingOperation,
	IAnnualCategory,
	IOperation,
	TypeAnnualDirection
} from '~/shared/types/annual.interface'

/**
 * Находит счет по его номеру в массиве счетов.
 *
 * @param accounts - Массив счетов.
 * @param account - Номер искомого счета.
 * @returns Найденный счет или undefined, если счет не найден.
 */
const findAccount = (accounts: IAccount[], account: string) =>
	accounts.find(acc => acc.number === account)

/**
 * Определяет сумму операции, учитывая направление (дебет/кредит).
 *
 * @param accounts - Массив счетов.
 * @param operation - Операция, для которой нужно определить сумму.
 * @returns Положительное или отрицательное значение суммы операции.
 */
const setAmount = (accounts: IAccount[], operation: IAccountingOperation) => {
	const accountsList = accounts.map(account => account.number)
	return accountsList.includes(operation.debitAccount)
		? -operation.amount
		: operation.amount
}

/**
 * Определяет идентификатор категории для операции на основе полей subaccount.
 *
 * @param categories - Массив категорий.
 * @param operation - Операция, для которой нужно найти категорию.
 * @param inverted - Опциональный параметр, указывающий на инверсию поиска категории.
 * @returns Идентификатор категории или undefined, если категория не найдена.
 */
const setCategoryId = (
	categories: IAnnualCategory[],
	operation: IAccountingOperation,
	inverted?: 'inverted'
): string | undefined => {
	const searchFields =
		inverted === 'inverted'
			? [
					operation.creditSubaccount2,
					operation.creditSubaccount1,
					operation.debitSubaccount2,
					operation.debitSubaccount1
			  ]
			: [
					operation.debitSubaccount2,
					operation.debitSubaccount1,
					operation.creditSubaccount2,
					operation.creditSubaccount1
			  ]

	for (const fieldValue of searchFields) {
		if (fieldValue && fieldValue.length > 0) {
			const category = categories.find(
				category => category.value === fieldValue
			)
			if (category) {
				return category.id.toString()
			}
		}
	}

	return ''
}

/**
 * Определяет направление операции (дебет/кредит) на основе счетов.
 *
 * @param accounts - Массив счетов.
 * @param operation - Операция, для которой нужно определить направление.
 * @param inverted - Опциональный параметр, указывающий на инверсию направления.
 * @returns Направление операции в виде строки TypeAnnualDirection или undefined.
 */
const setDirection = (
	accounts: IAccount[],
	operation: IAccountingOperation,
	inverted?: 'inverted'
): TypeAnnualDirection | undefined => {
	const primaryAccountNumber =
		inverted === 'inverted' ? operation.creditAccount : operation.debitAccount
	const secondaryAccountNumber =
		inverted === 'inverted' ? operation.debitAccount : operation.creditAccount

	const primaryAccount = findAccount(accounts, primaryAccountNumber)
	const secondaryAccount = findAccount(accounts, secondaryAccountNumber)

	return primaryAccount?.type || secondaryAccount?.type
}

/**
 * Преобразует бухгалтерскую операцию в унифицированный формат операции.
 *
 * @param operation - Бухгалтерская операция для преобразования.
 * @param _id - Уникальный идентификатор операции.
 * @param categories - Массив категорий.
 * @param accounts - Массив счетов.
 * @returns Унифицированная операция в формате IOperation.
 */
const unifyAccountingOperation = (
	operation: IAccountingOperation,
	_id: string,
	categories: IAnnualCategory[],
	accounts: IAccount[]
) => {
	return {
		_id,
		categoryId: setCategoryId(categories, operation),
		amount: setAmount(accounts, operation),
		date: operation.date,
		document: operation.document,
		description: operation.description ?? '',
		direction: setDirection(accounts, operation)
	} as IOperation
}

/**
 * Создает копию операции с инвертированными значениями для дублирования внутренних транзакций.
 *
 * @param operation - Оригинальная бухгалтерская операция.
 * @param _id - Уникальный идентификатор копии операции.
 * @param categories - Массив категорий.
 * @param accounts - Массив счетов.
 * @returns Копия операции с инвертированными значениями в формате IOperation.
 */
const copyInvertedOperation = (
	operation: IAccountingOperation,
	_id: string,
	categories: IAnnualCategory[],
	accounts: IAccount[]
) => {
	return {
		_id,
		categoryId: setCategoryId(categories, operation, 'inverted'),
		amount: -operation.amount,
		date: operation.date,
		document: operation.document,
		description: operation.description ?? '',
		direction: setDirection(accounts, operation, 'inverted')
	} as IOperation
}

/**
 * Обрабатывает массив бухгалтерских операций, преобразуя каждую в унифицированный формат.
 * В случае, если операция проходит между счетами в массиве accounts, добавляет инвертированную копию операции.
 *
 * @param operations - Массив бухгалтерских операций для обработки.
 * @param categories - Массив категорий.
 * @param accounts - Массив счетов.
 * @returns Массив унифицированных операций.
 */
export const unifyAccountingOperations = (
	operations: IAccountingOperation[],
	categories: IAnnualCategory[],
	accounts: IAccount[]
) => {
	const unifiedOperations = [] as IOperation[]

	operations.forEach((operation: IAccountingOperation, index: number) => {
		if (
			findAccount(accounts, operation.debitAccount) &&
			findAccount(accounts, operation.creditAccount)
		) {
			unifiedOperations.push(
				copyInvertedOperation(
					operation,
					(-index).toString(),
					categories,
					accounts
				)
			)
		}
		unifiedOperations.push(
			unifyAccountingOperation(
				operation,
				index.toString(),
				categories,
				accounts
			)
		)
	})
	return unifiedOperations
}
