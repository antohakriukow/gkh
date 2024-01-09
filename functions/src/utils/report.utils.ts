import {
	IAccruals,
	IBudgetFinancing,
	IIncome,
	IOrganizationDebts,
	IRenovationCosts,
	IResidentsDebts,
	IServices,
	ISettings
} from '../types/report22gkh.interface'

/**
 * Удаляет из объекта все поля со значением 0 или undefined.
 *
 * @param obj - Объект для обработки.
 * @returns Новый объект без полей со значением 0 или undefined.
 */
export const removeZeroAndUndefined = (obj: any): any => {
	if (typeof obj !== 'object' || obj === null) {
		return obj
	}

	const newObj: { [key: string]: any } = Array.isArray(obj) ? [] : {}

	Object.keys(obj).forEach(key => {
		const value = obj[key]
		if (typeof value === 'object' && value !== null) {
			const result = removeZeroAndUndefined(value)
			if (Object.keys(result).length > 0) {
				newObj[key] = result
			}
		} else if (value !== 0 && value !== undefined) {
			newObj[key] = value
		}
	})

	return newObj
}

/**
 * Вычисляет платежи за предыдущий период.
 *
 * @param payments - Сумма платежей за текущий период.
 * @param accruals - Начисления за текущий период.
 * @returns Сумма платежей за предыдущий период.
 */
export const calculatePreviousPayments = (
	payments: number,
	accruals: number
) => (payments > accruals ? payments - accruals : 0)

/**
 * Распределяет значения по заданным областям.
 *
 * @param inputObject - Объект со значениями для распределения.
 * @param areaOne - Первая область для распределения.
 * @param areaTwo - Вторая область для распределения.
 * @param areaThree - Третья область для распределения (необязательно).
 * @returns Массив объектов с распределенными значениями.
 */
export const distributeValues = (
	inputObject: { [key: string]: number },
	areaOne: number,
	areaTwo: number,
	areaThree?: number
): Array<{ [key: string]: number }> => {
	const resultObjectOne: { [key: string]: number } = {}
	const resultObjectTwo: { [key: string]: number } = {}
	let resultObjectThree: { [key: string]: number } | undefined = areaThree
		? {}
		: undefined

	const totalArea = areaOne + areaTwo + (areaThree ?? 0)

	if (totalArea === 0) return [{}, {}, {}]

	for (const [key, value] of Object.entries(inputObject)) {
		const portionOne = Math.round((value * areaOne) / totalArea)
		const portionTwo = areaThree
			? Math.round((value * areaTwo) / totalArea)
			: value - portionOne

		resultObjectOne[key] = portionOne
		resultObjectTwo[key] = portionTwo

		if (resultObjectThree) {
			resultObjectThree[key] = value - portionOne - portionTwo
		}
	}

	const resultArray = [resultObjectOne, resultObjectTwo]
	if (resultObjectThree) {
		resultArray.push(resultObjectThree)
	}

	return resultArray
}

/**
 * Генерирует объект с площадями для различных услуг.
 *
 * Эта функция принимает настройки услуг и стандартную площадь,
 * а затем создает объект, в котором каждому ключу услуги соответствует
 * его площадь. Если для конкретной услуги площадь не указана в настройках,
 * используется стандартная площадь.
 *
 * @param settings - Объект настроек, содержащий информацию об услугах и их площадях.
 * @param defaultArea - Стандартная площадь, используемая, если площадь услуги не указана.
 * @returns Объект, где ключи - это названия услуг, а значения - соответствующие площади.
 */
export const generateServicesArea = (
	settings: ISettings,
	defaultArea: number
): { [key: string]: number } => {
	const servicesArea: { [key: string]: number } = {}

	if (settings.services) {
		Object.keys(settings.services).forEach(key => {
			const service = settings.services![key as keyof IServices]
			servicesArea[key] = service && service.area ? service.area : defaultArea
		})
	}

	return servicesArea
}

// Рекурсивно обходит объект и делит каждое число на 1000, после чего округляет вверх до целого
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
				;(result as any)[key] = Math.ceil(value / 1000)
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
