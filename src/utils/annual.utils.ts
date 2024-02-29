import {
	IAccount,
	IAnnualCategory,
	IAnnualCategoryState,
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
			direction === 'renovation' ? 1001 : direction === 'target' ? 2001 : 3001
		return accounts
			.filter(account => account.type === direction)
			.map((account, index) => ({
				id: index + incrementNumber,
				value: account.number.toString()
			}))
	}
}
