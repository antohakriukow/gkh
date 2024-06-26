import { TypeRatePart } from '~/shared/types/debts/debt.interface'

import { getDayJSObjectFromString } from '~/utils/period.utils'

import { IDebtInterval, PreviousIntervalsData } from '../types'

const applyPreviousIntervalData = (
	intervals: IDebtInterval[],
	modifyingDaysCount: number,
	newRatePart: TypeRatePart
): [IDebtInterval[], IDebtInterval[]] => {
	const modifiedIntervals: IDebtInterval[] = []
	let remainingDays = modifyingDaysCount
	const remainingIntervals: IDebtInterval[] = []

	for (let i = 0; i < intervals.length; i++) {
		const interval = intervals[i]

		if (remainingDays === 0) {
			remainingIntervals.push(...intervals.slice(i))
			break
		}

		if (interval.daysCount > remainingDays) {
			const newInterval: IDebtInterval = {
				...interval,
				endDate: getDayJSObjectFromString(interval.startDate)
					.add(remainingDays - 1, 'day')
					.format('DD.MM.YYYY'),
				daysCount: remainingDays,
				ratePart: newRatePart
			}
			modifiedIntervals.push(newInterval)

			const remainingInterval: IDebtInterval = {
				...interval,
				startDate: getDayJSObjectFromString(newInterval.endDate)
					.add(1, 'day')
					.format('DD.MM.YYYY'),
				daysCount: interval.daysCount - remainingDays,
				ratePart: interval.ratePart
			}
			remainingIntervals.push(remainingInterval)
			remainingDays = 0
		} else {
			const newInterval: IDebtInterval = {
				...interval,
				ratePart: newRatePart
			}
			remainingDays -= interval.daysCount
			modifiedIntervals.push(newInterval)
		}
	}

	return [modifiedIntervals, remainingIntervals]
}

export const addPreviousDebtIntervals = (
	intervals: IDebtInterval[],
	previousIntervalsData: PreviousIntervalsData
): IDebtInterval[] => {
	let updatedIntervals = [...intervals]

	for (const [modifyingDaysCount, newRatePart] of previousIntervalsData) {
		const [modified, remaining] = applyPreviousIntervalData(
			updatedIntervals,
			modifyingDaysCount,
			newRatePart
		)
		updatedIntervals = [...modified, ...remaining]
	}

	return updatedIntervals
}
