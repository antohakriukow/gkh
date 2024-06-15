import {
	calculatePenaltiesForPeriod,
	getCurrentRate,
	getDaysCount,
	getDebtIntervals
} from './utils'

import { IDebtData, IPenaltyData } from '~/shared/types/debts/debt.interface'

import { getStringDate } from '~/utils/period.utils'

export const calculatePenalties = (
	debts: IDebtData[],
	isMain: boolean
): IPenaltyData[] => {
	const penalties: IPenaltyData[] = []
	const currentDate = getStringDate(new Date())

	debts.forEach(debt => {
		if (isMain) {
			const rate = getCurrentRate()
			const calculatedPenalties = calculatePenaltiesForPeriod(
				debt.startDate,
				currentDate,
				+debt.value,
				rate!,
				true
			)

			penalties.push({
				period: debt.period,
				value: calculatedPenalties.toFixed(2),
				startDate: debt.startDate,
				endDate: currentDate,
				rate: rate!.toFixed(2),
				daysCount: getDaysCount(debt.startDate, currentDate).toFixed()
			})
		} else {
			const intervals = getDebtIntervals(debt.startDate)
			intervals.forEach(({ startDate, endDate, rate, daysCount }, index) => {
				const calculatedPenalties = calculatePenaltiesForPeriod(
					startDate,
					endDate,
					+debt.value,
					rate!,
					index === intervals.length - 1 ? true : false
				)

				penalties.push({
					period: debt.period,
					value: calculatedPenalties.toFixed(2),
					startDate: startDate,
					endDate: endDate,
					rate: rate.toFixed(2),
					daysCount: daysCount.toFixed()
				})
			})
		}
	})

	return penalties
}
