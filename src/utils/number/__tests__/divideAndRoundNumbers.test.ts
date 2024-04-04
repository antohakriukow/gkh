import {
	divideAndRoundNumbersExpectedResult,
	divideAndRoundNumbersMock
} from '../mocks/divideAndRoundNumbers'
import { divideAndRoundNumbers } from '../utils'

describe('divideAndRoundNumbers', () => {
	const mockAccruals = divideAndRoundNumbersMock
	const expected = divideAndRoundNumbersExpectedResult

	it('with mock accruals -> returns correct divided accruals', () => {
		expect(divideAndRoundNumbers(mockAccruals)).toEqual(expected)
	})
})
