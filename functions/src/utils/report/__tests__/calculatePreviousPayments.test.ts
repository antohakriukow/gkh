import { calculatePreviousPayments } from '../utils'

describe('calculatePreviousPayments', () => {
	it('should return payments minus accruals if payments greater than accruals', () => {
		expect(calculatePreviousPayments(200, 100)).toBe(100)
	})

	it('should return 0 if payments less than or equal to accruals', () => {
		expect(calculatePreviousPayments(100, 200)).toBe(0)
		expect(calculatePreviousPayments(100, 100)).toBe(0)
	})
})
