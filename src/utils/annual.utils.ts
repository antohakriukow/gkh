import {
	IAccount,
	IAnnualCategory,
	IAnnualCategoryState,
	IExtendedBankOperation,
	TypeAnnualDirection,
	TypeAnnualReportStructure,
	TypeDefinedAnnualDirection
} from '~/shared/types/annual.interface'

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

export const removeCollapsedFromCategories = (
	categories: IAnnualCategoryState[]
): IAnnualCategory[] => {
	const response = categories.map(({ id, value, amount, children }) => {
		// Инициализируем объект категории только с обязательными полями
		const categoryObject: IAnnualCategory = { id, value }

		// Динамически добавляем amount, если он существует
		if (amount !== undefined) {
			categoryObject.amount = amount
		}

		// Рекурсивно обрабатываем дочерние элементы, если они существуют
		if (children) {
			categoryObject.children = removeCollapsedFromCategories(
				children as IAnnualCategoryState[]
			)
		}

		return categoryObject
	})

	return response
}

export const getCategoriesWithoutChildren = (
	categories: IAnnualCategory[]
): { title: string; value: string }[] => {
	function traverse(
		categories: IAnnualCategory[],
		acc: { title: string; value: string }[]
	): void {
		categories.forEach(category => {
			if (!category.children) {
				acc.push({ title: category.value, value: category.id.toString() })
			} else {
				traverse(category.children, acc)
			}
		})
	}

	const result: { title: string; value: string }[] = []
	traverse(categories, result)
	return result
}

export const getExistingDirections = (accounts: IAccount[]) =>
	accounts.reduce(
		(directions: TypeAnnualDirection[], account) =>
			directions.includes(account.type)
				? directions
				: [...directions, account.type],
		[]
	)

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

export const sortOperationsGroupsArrayByRecipientName = (groupedOperations: {
	[key: string]: IExtendedBankOperation[]
}) =>
	Object.entries(groupedOperations)
		.map(([recipientName, operations]) => ({ recipientName, operations }))
		.sort((a, b) => b.operations.length - a.operations.length)

export const sortOperationsGroupsArrayByPayerName = (groupedOperations: {
	[key: string]: IExtendedBankOperation[]
}) =>
	Object.entries(groupedOperations)
		.map(([payerName, operations]) => ({ payerName, operations }))
		.sort((a, b) => b.operations.length - a.operations.length)

// export const getOperationsByCategory = (
// 	operations: IExtendedBankOperation[],
// 	category: IAnnualCategory
// ) => {
// 	const categoryIds = getCategoriesWithoutChildren([category]).map(
// 		cat => cat.value
// 	)
// 	return operations.reduce(
// 		(result: IExtendedBankOperation[], operation: IExtendedBankOperation) => {
// 			if (categoryIds.includes(operation.categoryId.toString())) {
// 				return [...result, operation]
// 			}
// 			return result
// 		},
// 		[] as IExtendedBankOperation[]
// 	)
// }

// Функция для получения идентификаторов текущей категории и всех её дочерних категорий
const getAllCategoryIds = (
	category: IAnnualCategory,
	ids: string[] = []
): string[] => {
	ids.push(category.id) // Теперь TypeScript знает, что id это строка
	if (category.children && category.children.length > 0) {
		category.children.forEach(child => getAllCategoryIds(child, ids)) // Рекурсивно добавляем идентификаторы дочерних категорий
	}
	return ids
}

// Обновлённая функция getOperationsByCategory
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
