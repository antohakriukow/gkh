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

export const removeUndefinedAndNaNFields = (obj: any): void => {
	Object.keys(obj).forEach(key => {
		if (typeof obj[key] === 'object' && obj[key] !== null) {
			removeUndefinedAndNaNFields(obj[key])
		} else if (
			obj[key] === undefined ||
			(typeof obj[key] === 'number' && Number.isNaN(obj[key]))
		) {
			delete obj[key]
		}
	})
}

export const getReportTitle = (data: IReport) => [
	{ _name: 'item', _attrs: { name: 'okpo', value: data.company.okpo } },
	{
		_name: 'item',
		_attrs: { name: 'name', value: data.company.name.full }
	},
	{
		_name: 'item',
		_attrs: { name: 'leader_fio', value: data.company.leader_name }
	},
	{
		_name: 'item',
		_attrs: { name: 'responsible_post', value: data.company.leader_post }
	},
	{
		_name: 'item',
		_attrs: { name: 'responsible_fio', value: data.company.leader_name }
	},
	{ _name: 'item', _attrs: { name: 'phone', value: 'NEED DATA' } },
	{ _name: 'item', _attrs: { name: 'mail', value: 'NEED DATA' } }
]

export const readReportSchema = (schemaChapterOne: Object) => {
	return Object.entries(schemaChapterOne)
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

			return {
				_name: 'row',
				_attrs: { code: key },
				_content: contentArray
			}
		})
}

export const calculatePreviousPayments = (
	payments: number,
	accruals: number
) => (payments > accruals ? payments - accruals : 0)

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
