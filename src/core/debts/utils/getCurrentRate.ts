import { refinancingRates } from '../rates'

export const getCurrentRate = () =>
	refinancingRates.map(([date, rate]) => [date, rate]).at(-1)?.[1]
