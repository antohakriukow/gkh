import {
	IDebt,
	IDebtData,
	IPenaltyData
} from '~/shared/types/debts/debt.interface'
import { TypeMonth } from '~/shared/types/period.interface'

import { getMonthName } from '~/utils/period.utils'

import { convertToRoubles } from '../../../pdf.utils'

export const getPenaltiesDetailsTitle = (debt: IDebt) => ({
	text: `Расчет пени по оплате ${
		debt?.options?.direction === 'ЖКУ'
			? 'коммунальных услуг и содержанию общего имущества собственников многоквартирного дома'
			: 'взносов на капитальный ремонт'
	}`,
	bold: true,
	alignment: 'center',
	pageBreak: 'before',
	with: '50%'
})

const tableHeader = [
	[
		{
			text: 'Период',
			bold: true,
			fillColor: '#c9cee8',
			rowSpan: 2,
			alignment: 'center'
		},
		{
			text: 'Начислено',
			bold: true,
			fillColor: '#c9cee8',
			rowSpan: 2,
			alignment: 'center'
		},
		{
			text: 'Долг',
			bold: true,
			fillColor: '#c9cee8',
			rowSpan: 2,
			alignment: 'center'
		},
		{
			text: 'Период просрочки',
			bold: true,
			fillColor: '#c9cee8',
			colSpan: 3,
			alignment: 'center'
		},
		{},
		{},
		{
			text: 'Ставка',
			bold: true,
			fillColor: '#c9cee8',
			rowSpan: 2,
			alignment: 'center'
		},
		{
			text: 'Доля ставки',
			bold: true,
			fillColor: '#c9cee8',
			rowSpan: 2,
			alignment: 'center'
		},
		{
			text: 'Формула',
			bold: true,
			fillColor: '#c9cee8',
			rowSpan: 2,
			alignment: 'center'
		},
		{
			text: 'Пени',
			bold: true,
			fillColor: '#c9cee8',
			rowSpan: 2,
			alignment: 'center'
		}
	],
	[
		{},
		{},
		{},
		{
			text: 'с',
			bold: true,
			fillColor: '#c9cee8',
			alignment: 'center'
		},
		{
			text: 'по',
			bold: true,
			fillColor: '#c9cee8',
			alignment: 'center'
		},
		{
			text: 'дней',
			bold: true,
			fillColor: '#c9cee8',
			alignment: 'center'
		},
		{},
		{},
		{},
		{}
	]
]

const getTableFooter = (totalMain: string, totalPenalties: string) => [
	[
		{
			text: `Сумма основного долга: ${convertToRoubles(totalMain)}`,
			bold: true,
			fillColor: '#c9cee8',
			colSpan: 10,
			alignment: 'right'
		}
	],
	[
		{
			text: `Сумма пени по всем задолженностям: ${convertToRoubles(
				totalPenalties
			)}`,
			bold: true,
			fillColor: '#c9cee8',
			colSpan: 10,
			alignment: 'right'
		}
	]
]

const getTableRows = (debtItems: IDebtData[], penaltyItems: IPenaltyData[]) => {
	const rows: Array<
		Array<{ text: string; bold: boolean; alignment?: string; rowSpan?: number }>
	> = []

	const periodMap = new Map<
		string,
		{
			month: number
			year: number
			totalDebt: string
			rows: Array<{
				row: Array<{ text: string; bold: boolean; alignment?: string }>
			}>
		}
	>()

	debtItems.forEach(debtItem => {
		const periodKey = `${debtItem.period.month}-${debtItem.period.year}`
		if (!periodMap.has(periodKey)) {
			periodMap.set(periodKey, {
				month: debtItem.period.month,
				year: debtItem.period.year,
				totalDebt: debtItem.value,
				rows: []
			})
		} else {
			// Суммируем значения долга для периода
			const existingPeriod = periodMap.get(periodKey)!
			existingPeriod.totalDebt = (
				parseFloat(existingPeriod.totalDebt) + parseFloat(debtItem.value)
			).toString()
		}

		penaltyItems
			.filter(
				penaltyItem =>
					penaltyItem.period.month === debtItem.period.month &&
					penaltyItem.period.year === debtItem.period.year
			)
			.forEach(penaltyRow => {
				periodMap.get(periodKey)!.rows.push({
					row: [
						{
							text: debtItem.value,
							bold: true,
							alignment: 'center'
						},
						{
							text: penaltyRow.startDate,
							bold: true,
							alignment: 'center'
						},
						{
							text: penaltyRow.endDate,
							bold: true,
							alignment: 'center'
						},
						{
							text: penaltyRow.daysCount,
							bold: true,
							alignment: 'center'
						},
						{
							text: `${(+penaltyRow.rate).toFixed(2)}%`,
							bold: true,
							alignment: 'center'
						},
						{
							text: '1/300',
							bold: true,
							alignment: 'center'
						},
						{
							text: `${debtItem.value} × ${
								penaltyRow.daysCount
							} × 1/300 × ${(+penaltyRow.rate).toFixed(2)}%`,
							bold: true,
							alignment: 'center'
						},
						{
							text: penaltyRow.value,
							bold: true,
							alignment: 'center'
						}
					]
				})
			})
	})

	periodMap.forEach(periodData => {
		const rowSpan = periodData.rows.length
		periodData.rows.forEach((penaltyRowData, index: number) => {
			if (index === 0) {
				rows.push([
					{
						text: `${getMonthName(periodData.month as TypeMonth)} ${
							periodData.year
						}`,
						bold: true,
						alignment: 'center',
						rowSpan: rowSpan
					},
					{
						text: periodData.totalDebt,
						bold: true,
						alignment: 'center',
						rowSpan: rowSpan
					},
					...penaltyRowData.row
				])
			} else {
				rows.push([
					{
						text: '',
						bold: true,
						alignment: 'center'
					},
					{
						text: '',
						bold: true,
						alignment: 'center'
					},
					...penaltyRowData.row
				])
			}
		})
	})

	return rows
}

export const getPenaltiesTable = (debt: IDebt) => ({
	table: {
		widths: [50, 40, 35, 45, 45, 20, 30, 25, 125, 35],
		body: [
			...tableHeader,
			...getTableRows(debt.main.data, debt.penalties.data),
			...getTableFooter(debt.main.total, debt.penalties.total)
		]
	},
	fontSize: 8
})
