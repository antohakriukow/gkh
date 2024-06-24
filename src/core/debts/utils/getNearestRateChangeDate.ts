import { parseDate } from './parseDate'

import { getRefinancingRates } from '../rates'

export const getNearestRateChangeDate = (date: string): string | null => {
	const inputDate = parseDate(date)

	const nearestRateChange = getRefinancingRates()
		.map(([rateDateString]) => parseDate(rateDateString))
		.find(rateDate => rateDate > inputDate)

	return nearestRateChange
		? nearestRateChange.toLocaleDateString('ru-RU')
		: null
}
