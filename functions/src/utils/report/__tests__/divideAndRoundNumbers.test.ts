import {
	IAccruals,
	IIncome
} from '../../../../../src/shared/types/report22gkh.interface'
import { divideAndRoundNumbers } from '../utils'

describe('divideAndRoundNumbers', () => {
	it('should divide and round up all number values for IAccruals', () => {
		const input = { coldWater: 2000, hotWater: 3500 } as IAccruals
		const expected = { coldWater: 2, hotWater: 4 }
		expect(divideAndRoundNumbers(input)).toEqual(expected)
	})

	it('should divide and round up all number values for IIncome', () => {
		const input = { housing: 2500, renovation: 500 } as IIncome
		const expected = { housing: 3, renovation: 1 }
		expect(divideAndRoundNumbers(input)).toEqual(expected)
	})
})
