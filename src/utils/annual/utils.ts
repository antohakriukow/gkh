import {
	AnnualState,
	IAccount,
	IAccountingOperation,
	IAnnualCategory,
	IAnnualCategoryState,
	IBankOperation,
	IExtendedAccountingOperation,
	IExtendedBankOperation,
	TypeAnnualDirection,
	TypeAnnualReportStructure,
	TypeDefinedAnnualDirection
} from '~/shared/types/annual.interface'

/**
 * Возвращает название структуры отчёта по его типу.
 *
 * @param name - Тип структуры отчёта.
 * @returns Название структуры отчёта.
 */
export const getAnnualReportStructureName = (
	name: TypeAnnualReportStructure | undefined
) => {
	switch (name) {
		case 'accruals/services':
			return 'Метод начислений'
		case 'cash/partners':
			return 'Кассовый метод'
		case 'cash/services':
			return 'Смешанный'
		default:
			return 'Не выбран'
	}
}

/**
 * Возвращает название направления отчёта по его типу.
 *
 * @param direction - Тип направления отчёта.
 * @returns Название направления отчёта.
 */
export const getAnnualDirectionTitle = (direction: TypeAnnualDirection) => {
	switch (direction) {
		case 'main':
			return 'ЖКУ'
		case 'renovation':
			return 'Капитальный ремонт'
		case 'commerce':
			return 'Коммерческая деятельность'
		case 'target':
			return 'Целевые взносы'
		default:
			return ''
	}
}

/**
 * Удаляет свойство collapsed из категорий и возвращает новый массив категорий без этого свойства.
 *
 * @param categories - Массив категорий с состоянием collapsed.
 * @returns Новый массив категорий без свойства collapsed.
 */
export const removeCollapsedFromCategories = (
	categories: IAnnualCategoryState[]
): IAnnualCategory[] => {
	const response = categories.map(({ id, value, amount, children }) => {
		const categoryObject: IAnnualCategory = { id, value }

		if (amount !== undefined) {
			categoryObject.amount = amount
		}

		if (children) {
			categoryObject.children = removeCollapsedFromCategories(
				children as IAnnualCategoryState[]
			)
		}

		return categoryObject
	})

	return response
}

/**
 * Получает список уникальных направлений из массива счетов.
 *
 * @param accounts - Массив счетов.
 * @returns Массив уникальных направлений.
 */
export const getExistingDirections = (accounts: IAccount[]) =>
	accounts.reduce(
		(directions: TypeAnnualDirection[], account) =>
			directions.includes(account.type)
				? directions
				: [...directions, account.type],
		[]
	)

/**
 * Создаёт макет категорий на основе существующих счетов для указанного направления.
 *
 * @param accounts - Массив счетов.
 * @param direction - Направление для фильтрации счетов.
 * @returns Массив макетов категорий.
 */
export const createMockCategoriesFromAccounts = (
	accounts: IAccount[],
	direction: TypeDefinedAnnualDirection
) => {
	if (getExistingDirections(accounts).includes(direction)) {
		const incrementNumber =
			direction === 'renovation'
				? '1001'
				: direction === 'target'
				? '2001'
				: '3001'
		return accounts
			.filter(account => account.type === direction)
			.map((account, index) => ({
				id: String(index + Number(incrementNumber)),
				value: account.number.toString()
			}))
	}
}

/**
 * Группирует операции по имени получателя.
 *
 * @param operations - Массив банковских операций.
 * @returns Объект с операциями, сгруппированными по имени получателя.
 */
export const groupOperationsByRecipientName = (
	operations: IExtendedBankOperation[]
) =>
	operations.reduce(
		(
			acc: { [key: string]: IExtendedBankOperation[] },
			operation: IExtendedBankOperation
		) => {
			const { recipientName = 'Unknown' } = operation
			acc[recipientName] = acc[recipientName] || []
			acc[recipientName].push(operation)
			return acc
		},
		{}
	)

/**
 * Группирует операции по имени плательщика.
 *
 * @param operations - Массив банковских операций.
 * @returns Объект с операциями, сгруппированными по имени плательщика.
 */
export const groupOperationsByPayerName = (
	operations: IExtendedBankOperation[]
) =>
	operations.reduce(
		(
			acc: { [key: string]: IExtendedBankOperation[] },
			operation: IExtendedBankOperation
		) => {
			const { payerName = 'Unknown' } = operation
			acc[payerName] = acc[payerName] || []
			acc[payerName].push(operation)
			return acc
		},
		{}
	)

/**
 * Сортирует группы операций по имени получателя по убыванию количества операций.
 *
 * @param groupedOperations - Объект с операциями, сгруппированными по имени получателя.
 * @returns Отсортированный массив групп операций.
 */
export const sortOperationsGroupsArrayByRecipientName = (groupedOperations: {
	[key: string]: IExtendedBankOperation[]
}) =>
	Object.entries(groupedOperations)
		.map(([recipientName, operations]) => ({ recipientName, operations }))
		.sort((a, b) => b.operations.length - a.operations.length)

/**
 * Сортирует группы операций по имени плательщика по убыванию количества операций.
 *
 * @param groupedOperations - Объект с операциями, сгруппированными по имени плательщика.
 * @returns Отсортированный массив групп операций.
 */
export const sortOperationsGroupsArrayByPayerName = (groupedOperations: {
	[key: string]: IExtendedBankOperation[]
}) =>
	Object.entries(groupedOperations)
		.map(([payerName, operations]) => ({ payerName, operations }))
		.sort((a, b) => b.operations.length - a.operations.length)

/**
 * Возвращает все ID категорий, включая ID дочерних категорий.
 *
 * @param category - Категория для анализа.
 * @param ids - Начальный массив ID для рекурсии.
 * @returns Массив всех ID категорий.
 */
export const getAllCategoryIds = (
	category: IAnnualCategory,
	ids: string[] = []
): string[] => {
	ids.push(category.id)
	if (category.children && category.children.length > 0) {
		category.children.forEach(child => getAllCategoryIds(child, ids))
	}
	return ids
}

/**
 * Фильтрует операции по категории, включая все дочерние категории.
 *
 * @param operations - Массив банковских операций.
 * @param category - Категория для фильтрации операций.
 * @returns Массив операций, соответствующих категории.
 */
export const getOperationsByCategory = (
	operations: IExtendedBankOperation[],
	category: IAnnualCategory
) => {
	const categoryIds = getAllCategoryIds(category)

	const result = operations.filter(operation =>
		categoryIds.includes(operation.categoryId.toString())
	)
	return result
}

/**
 * Возвращает массив номеров счетов для заданного направления.
 *
 * @param state - объект типа AnnualState.
 * @param direction - направление типа TypeAnnualDirection.
 * @returns Возвращает массив строк, представляющих номера счетов, соответствующих заданному направлению.
 */
export const getDirectionAccountNumbers = (
	state: AnnualState,
	direction: TypeAnnualDirection
): string[] => {
	if (!state.accounts) return []
	return state.accounts
		.filter(account => account.type === direction)
		.map(account => account.number)
}

/**
 * Возвращает ID всех листовых категорий.
 *
 * @param categories - Массив категорий для анализа.
 * @param leafIds - Начальный массив ID листовых категорий для рекурсии.
 * @returns Массив ID всех листовых категорий.
 */
export const getAllLeafCategoryIds = (
	categories: IAnnualCategory[],
	leafIds: string[] = []
): string[] => {
	categories.forEach(category => {
		if (category.children && category.children.length > 0) {
			getAllLeafCategoryIds(category.children, leafIds)
		} else {
			leafIds.push(category.id)
		}
	})

	return leafIds
}

/**
 * Проверяет объект на соответствие типу IAccountingOperation.
 *
 * @param operation - операция типа IAccountingOperation | IBankOperation.
 * @returns Возвращает true, если тип операции IAccountingOperation, иначе false.
 */
export const isAccountingOperation = (
	operation: IAccountingOperation | IBankOperation
): operation is IAccountingOperation => {
	return (operation as IAccountingOperation).debitAccount !== undefined
}

/**
 * Проверяет объект на соответствие типу IBankOperation.
 *
 * @param operation - операция типа IAccountingOperation | IBankOperation.
 * @returns Возвращает true, если тип операции IBankOperation, иначе false.
 */
export const isBankOperation = (
	operation: IAccountingOperation | IBankOperation
): operation is IBankOperation => {
	return (operation as IBankOperation).paymentPurpose !== undefined
}

/**
 * Проверяет объект на соответствие типу IExtendedBankOperation.
 *
 * @param operation - операция типа IExtendedAccountingOperation | IExtendedBankOperation.
 * @returns Возвращает true, если тип операции IExtendedBankOperation, иначе false.
 */
export const isExtendedBankOperation = (
	operation: IExtendedAccountingOperation | IExtendedBankOperation
): operation is IExtendedBankOperation => {
	return (operation as IExtendedBankOperation).paymentPurpose !== undefined
}
