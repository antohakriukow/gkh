import {
	addPreviousDebtIntervals,
	getDaysCount,
	getNearestRateChangeDate,
	getRateTupleIndex,
	now
} from '.'

import { TypeRatePart } from '~/shared/types/debts/debt.interface'

import { getDayJSObjectFromString, getPreviousDay } from '~/utils/period.utils'

import { getRefinancingRates } from '../rates'
import { IDebtInterval } from '../types'

export const getDebtIntervals = (date: string): IDebtInterval[] => {
	const rates = getRefinancingRates()
	const nearestRateChangeDate = getNearestRateChangeDate(date)

	const intervalAfterLastRateChange = {
		startDate: date,
		endDate: now,
		rate: rates.at(-1)![1],
		ratePart: 300 as TypeRatePart,
		daysCount: getDaysCount(date, now)
	}

	if (!nearestRateChangeDate) return [intervalAfterLastRateChange]

	const startIndex = getRateTupleIndex(nearestRateChangeDate!) - 1
	const slicedRateArray = rates.slice(startIndex)
	slicedRateArray[0][0] = date

	const intervals = slicedRateArray.map(([startDate, rate], index, array) => {
		const endDate =
			index === array.length - 1 ? now : getPreviousDay(array[index + 1][0])

		return {
			startDate,
			endDate,
			rate: Number(rate),
			ratePart: 300 as TypeRatePart,
			daysCount: getDaysCount(startDate, endDate)
		}
	})

	const debtDate = getDayJSObjectFromString(date)
	const cutoffDate = getDayJSObjectFromString('05.06.2016') // За 30 дней до внесения изменений в п. 14.1 статьи 155 ЖК РФ (первые 30 дней просрочки пени не начисляются). Изменения вступили в силу с 04.07.2016

	return debtDate.isAfter(cutoffDate)
		? addPreviousDebtIntervals(intervals, [[30, null]])
		: intervals
}
