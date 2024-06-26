import { addPreviousDebtIntervals } from './addPreviousDebtIntervals'
import { getCurrentRate } from './getCurrentRate'
import { getDaysCount } from './getDaysCount'
import { now } from './now'

import { TypeRatePart } from '~/shared/types/debts/debt.interface'

import { IDebtInterval } from '../types'

export const getMainDebtInterval = (date: string): IDebtInterval[] => {
	const intervals = [
		{
			startDate: date,
			endDate: now,
			rate: +getCurrentRate()!,
			ratePart: 130 as TypeRatePart,
			daysCount: getDaysCount(date, now)
		}
	]
	return addPreviousDebtIntervals(intervals, [
		[30, null],
		[60, 300]
	])
}
