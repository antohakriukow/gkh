import { convertPeriod } from '../utils'

describe('convertPeriod', () => {
	it('converts period numbers to their string representation', () => {
		expect(convertPeriod(1)).toEqual('1 квартал')
		expect(convertPeriod(2)).toEqual('1 полугодие')
		expect(convertPeriod(3)).toEqual('9 месяцев')
		expect(convertPeriod(4)).toEqual('')
	})

	it('returns the period as it is for non-defined values', () => {
		expect(convertPeriod(5)).toEqual(5)
	})
})
