import {
	calculatePenaltiesForPeriod,
	getDebtIntervals,
	getMainDebtInterval
} from './utils'

import { IDebtData, IPenaltyData } from '~/shared/types/debts/debt.interface'

export const calculatePenalties = (
	debts: IDebtData[],
	isMain: boolean
): IPenaltyData[] => {
	const penalties: IPenaltyData[] = []

	debts.forEach(debt => {
		const intervals = isMain
			? getMainDebtInterval(debt.startDate)
			: getDebtIntervals(debt.startDate)

		intervals.forEach(
			({ startDate, endDate, rate, ratePart, daysCount }, index) => {
				const calculatedPenalties = calculatePenaltiesForPeriod(
					startDate,
					endDate,
					+debt.value,
					rate!,
					ratePart,
					index === intervals.length - 1 ? true : false
				)

				penalties.push({
					startDate,
					endDate,
					period: debt.period,
					rate: (rate * 100).toFixed(2),
					ratePart,
					daysCount: daysCount.toFixed(),
					value: calculatedPenalties.toFixed(2)
				})
			}
		)
	})

	return penalties
}
