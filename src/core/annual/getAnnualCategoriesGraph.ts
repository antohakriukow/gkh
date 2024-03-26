import { getDirectionAccountNumbers, isAccountingOperation } from './shared'
import { AnnualState } from './types'

const createCategoriesGraph = (
	pairs: Array<{ debitAccount1: string; debitAccount2?: string }>
) => {
	let nextId = 1 // Начальное значение для уникальных id

	const groups = pairs.reduce<
		Record<
			string,
			{
				id: number
				value: string
				collapsed: boolean
				children: Array<{
					id: number
					value: string
					collapsed: boolean
					children: any[]
				}>
			}
		>
	>((acc, { debitAccount1, debitAccount2 }) => {
		// Проверяем, что debitAccount1 не пустой, прежде чем добавлять его
		if (debitAccount1 && !acc[debitAccount1]) {
			acc[debitAccount1] = {
				id: nextId++,
				value: debitAccount1,
				collapsed: false,
				children: []
			}
		}
		// Проверяем, что debitAccount2 не пустой, прежде чем добавлять его в children
		if (debitAccount1 && debitAccount2) {
			acc[debitAccount1]?.children.push({
				id: nextId++,
				value: debitAccount2,
				collapsed: false,
				children: []
			})
		}
		return acc
	}, {})

	Object.values(groups).forEach(group => {
		group.children.sort((a, b) => (a.value || '').localeCompare(b.value || ''))
	})

	// Фильтруем итоговый массив, чтобы исключить объекты с пустым value
	const result = Object.values(groups)
		.filter(group => group.value)
		.sort((a, b) => (a.value || '').localeCompare(b.value || ''))

	return result
}

export const getAnnualCategoriesGraph = (state: AnnualState) => {
	if (state.structure !== 'accruals/services') return []

	const mainAccountNumbers = getDirectionAccountNumbers(state, 'main')

	const uniqueOperationsMap = new Map<
		string,
		{ debitSubaccount1: string; debitSubaccount2: string }
	>()

	state.operations.forEach(operation => {
		if (
			isAccountingOperation(operation) &&
			mainAccountNumbers.includes(operation.debitAccount)
		) {
			// Создаем уникальный ключ на основе интересующих нас свойств
			const key = `${operation.debitSubaccount1}-${operation.debitSubaccount2}`

			// Проверяем, существует ли уже такой ключ в Map
			if (!uniqueOperationsMap.has(key)) {
				uniqueOperationsMap.set(key, {
					debitSubaccount1: operation.debitSubaccount1,
					debitSubaccount2: operation.debitSubaccount2
				})
			}
		}
	})

	// Преобразуем Map обратно в массив объектов для возвращения результата
	return createCategoriesGraph(
		Array.from(uniqueOperationsMap.values()).map(
			({ debitSubaccount1, debitSubaccount2 }) => ({
				debitAccount1: debitSubaccount1,
				debitAccount2: debitSubaccount2
			})
		)
	)
}
