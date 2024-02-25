import {
	IAccount,
	IAnnualCategory,
	TypeAnnualDirection,
	TypeAnnualReportStructure
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
