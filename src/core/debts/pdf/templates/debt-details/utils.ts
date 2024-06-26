import {
	IDebt,
	IDebtData,
	isMainDirection
} from '~/shared/types/debts/debt.interface'

import { getMonthName } from '~/utils/period.utils'

export const getDebtDetailsTitle = (debt: IDebt) => ({
	text: `Расчет задолженности по оплате ${
		isMainDirection(debt.options.direction)
			? 'коммунальных услуг и содержанию общего имущества собственников многоквартирного дома'
			: 'взносов на капитальный ремонт'
	}`,
	bold: true,
	alignment: 'center',
	with: '50%'
})

const tableHeader = [
	{
		text: `Период`,
		bold: true,
		fillColor: '#c9cee8'
	},
	{
		text: `Начислено`,
		bold: true,
		alignment: 'center',
		fillColor: '#c9cee8'
	},
	{
		text: `Оплачено`,
		bold: true,
		alignment: 'center',
		fillColor: '#c9cee8'
	},
	{
		text: `Долг`,
		bold: true,
		alignment: 'center',
		fillColor: '#c9cee8'
	}
]

const getTableFooter = (total: string) => [
	{
		text: 'Итого:'
	},
	{
		text: total,
		alignment: 'center'
	},
	{ text: '' },
	{
		text: total,
		alignment: 'center'
	}
]

const getTableRows = (debtItems: IDebtData[]) =>
	debtItems.map(debtItem => [
		{
			text: `${getMonthName(debtItem.period.month)} ${debtItem.period.year}`
		},
		{
			text: debtItem.value,
			alignment: 'center'
		},
		{
			text: '0',
			alignment: 'center'
		},
		{
			text: debtItem.value,
			alignment: 'center'
		}
	])

export const getDebtsTable = (debt: IDebt) => ({
	table: {
		widths: ['*', '*', '*', '*'],
		body: [
			tableHeader,
			...getTableRows(debt.main.data),
			getTableFooter(debt.main.total)
		]
	}
})
