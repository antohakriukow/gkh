import { IReport, TypeReport } from '~/shared/types/report.interface'

export const convertTypeReport = (type: TypeReport) =>
	type === '22gkh' ? '22-ЖКХ (Жилище)' : 'Отчет об исполнении сметы'

export const convertPeriod = (period: number) => {
	switch (period) {
		case 1:
			return '1 квартал'
		case 2:
			return '1 полугодие'
		case 3:
			return '9 месяцев'
		case 4:
			return ''
		default:
			return period
	}
}

/**
 * Заменяет все поля объекта со значением undefined или NaN на 0.
 *
 * @param obj - Объект для обработки.
 */
export const replaceUndefinedAndNaNWithZero = (obj: any): void => {
	Object.keys(obj).forEach(key => {
		if (typeof obj[key] === 'object' && obj[key] !== null) {
			replaceUndefinedAndNaNWithZero(obj[key])
		} else if (
			obj[key] === undefined ||
			(typeof obj[key] === 'number' && Number.isNaN(obj[key]))
		) {
			obj[key] = 0
		}
	})
}

/**
 * Читает схему отчета и возвращает структурированный массив данных.
 *
 * @param schema - Схема отчета.
 * @returns Массив объектов с данными отчета.
 */
export const readReportSchema = (schema?: Object) => {
	if (!schema) return
	return Object.entries(schema)
		.filter(([key, value]) => {
			return Object.values(value).some(
				val => val !== undefined && val !== null && val !== 0
			)
		})
		.map(([key, value]) => {
			const contentArray = Object.entries(value)
				.filter(
					([innerKey, val]) => val !== undefined && val !== null && val !== 0
				)
				.map(([innerKey, val]) => ({
					_name: 'col',
					_attrs: { code: innerKey },
					_content: val
				}))

			const formattedKey = key.padStart(2, '0')

			return {
				_name: 'row',
				_attrs: { code: formattedKey },
				_content: contentArray
			}
		})
}
