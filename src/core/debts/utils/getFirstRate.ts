import { parseDate } from './parseDate'

import { getRefinancingRates } from '../rates'

export const getFirstRate = (date: string): number | null => {
	const inputDate = parseDate(date)

	const firstRate = getRefinancingRates()
		.reverse()
		.find(([rateDate]) => parseDate(rateDate) <= inputDate)

	return firstRate ? firstRate[1] : null
}
