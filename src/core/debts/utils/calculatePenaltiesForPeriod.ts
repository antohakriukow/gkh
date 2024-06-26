import { getDaysCount } from './getDaysCount'

import { TypeRatePart } from '~/shared/types/debts/debt.interface'

export const calculatePenaltiesForPeriod = (
	startDate: string,
	finalDate: string,
	value: number,
	rate: number,
	ratePart: TypeRatePart,
	isFinal: boolean = false
) => {
	const daysCount = getDaysCount(startDate, finalDate)
	return !!ratePart ? (value * daysCount * rate) / ratePart : 0
}
