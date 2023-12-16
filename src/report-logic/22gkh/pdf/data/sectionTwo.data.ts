import { ISectionNames } from '../pdf.interface'

export const sectionTwoNames: ISectionNames = {
	section:
		'Раздел 2. Средства на капитальный ремонт общего имущества в многоквартирном доме (фонд капитального ремонта), тысяча рублей',
	60: 'Начислено взносов на капитальный ремонт',
	61: 'Оплачено взносов на капитальный ремонт',
	62: 'Фактические расходы на проведение капитального ремонта',
	63: 'в том числе бюджетное финансирование'
}

export const sectionTwoTitle = {
	text: sectionTwoNames.section,
	bold: true,
	alignment: 'center',
	pageBreak: 'before',
	margin: [0, 0, 0, 10]
}

export const sectionTwoTableHeader = [
	[
		{
			text: `Виды услуг`,
			alignment: 'center',
			margin: [0, 6, 0, 0]
		},
		{
			text: `№ строки`,
			alignment: 'center'
		},
		{
			text: `Региональный оператор`,
			alignment: 'center'
		},
		{
			text: `Владельцы спецсчета`,
			alignment: 'center'
		}
	],

	[
		{ text: `А`, alignment: 'center' },
		{ text: `Б`, alignment: 'center' },
		{ text: `3`, alignment: 'center' },
		{ text: `4`, alignment: 'center' }
	]
]
