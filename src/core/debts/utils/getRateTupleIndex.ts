import { getRefinancingRates } from '../rates'

export const getRateTupleIndex = (date: string) =>
	getRefinancingRates().findIndex(tuple => tuple[0] === date)
