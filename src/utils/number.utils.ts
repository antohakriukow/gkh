import {
	IAccruals,
	IBudgetFinancing,
	IIncome,
	IOrganizationDebts,
	IRenovationCosts,
	IResidentsDebts
} from '~/shared/types/report22gkh.interface'

// Рекурсивно обходит объект и делит каждое число на 1000, после чего округляет до целого
export const divideAndRoundNumbers = (
	obj:
		| IAccruals
		| IIncome
		| IOrganizationDebts
		| IResidentsDebts
		| IBudgetFinancing
		| IRenovationCosts
) => {
	const result: Partial<
		IAccruals &
			IIncome &
			IOrganizationDebts &
			IResidentsDebts &
			IBudgetFinancing &
			IRenovationCosts
	> = {}
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			const value = (obj as any)[key]
			if (typeof value === 'number') {
				;(result as any)[key] = Math.round(value / 1000)
			}
		}
	}
	return result as
		| IAccruals
		| IIncome
		| IOrganizationDebts
		| IResidentsDebts
		| IBudgetFinancing
		| IRenovationCosts
}

export const formatNumber = (number: number | string | undefined) => {
	// Обработка случая, когда значение не определено
	if (number === undefined) {
		return ''
	}

	// Приведение строкового значения к числу, если это возможно
	const num = typeof number === 'string' ? parseFloat(number) : number

	// Проверка на NaN, в случае если преобразование не удалось
	if (isNaN(num)) {
		console.error('Provided value cannot be converted to a number.')
		return ''
	}

	// Форматирование числа
	return num.toLocaleString('ru-RU', {
		style: 'decimal',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	})
}
