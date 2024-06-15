import { refinancingRates } from '~/components/screens/debt/components/debt-form/field-sets/data/refinancing-rates.data'

import {
	getDayJSObjectFromString,
	getPreviousDay,
	getStringDate
} from '~/utils/period.utils'

export const getCurrentRate = () => refinancingRates.at(-1)?.[1]

export const getFirstRate = (date: string) => {
	for (let i = refinancingRates.length - 1; i >= 0; i--) {
		const [rateDate, rateValue] = refinancingRates[i]
		if (new Date(rateDate) <= new Date(date)) {
			return rateValue
		}
	}
	return null
}

export const getNearestRateChangeDate = (date: string) => {
	for (let i = 0; i < refinancingRates.length; i++) {
		const [rateDate, _] = refinancingRates[i]
		if (new Date(rateDate) > new Date(date)) {
			return rateDate
		}
	}
	return null
}

export const getDaysCount = (dateStart: string, dateEnd: string) => {
	const start = getDayJSObjectFromString(dateStart)
	const end = getDayJSObjectFromString(dateEnd)

	const daysCount = +end.diff(start, 'day').toFixed(2) + 1

	return daysCount
}

export const calculatePenaltiesForPeriod = (
	startDate: string,
	finalDate: string,
	value: number,
	rate: number,
	isFinal: boolean = false
) => {
	const daysCount = getDaysCount(startDate, finalDate)
	return (value * daysCount * rate) / 300
}

const getRateTupleIndex = (date: string) =>
	refinancingRates.findIndex(tuple => tuple[0] === date)

export const getDebtIntervals = (
	date: string
): {
	startDate: string
	endDate: string
	rate: number
	daysCount: number
}[] => {
	const nearestRateChangeDate = getNearestRateChangeDate(date)
	const slicedRateArray = refinancingRates.slice(
		getRateTupleIndex(nearestRateChangeDate!) - 1
	)
	slicedRateArray[0][0] = date

	const result = slicedRateArray.map(([date, rate], index, array) => {
		const endDate =
			index === slicedRateArray.length - 1
				? getStringDate(new Date())
				: getPreviousDay(array[index + 1][0])

		return {
			startDate: date,
			endDate,
			rate,
			daysCount: getDaysCount(date, endDate)
		}
	})

	return result
}
