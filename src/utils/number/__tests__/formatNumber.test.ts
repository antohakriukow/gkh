import { formatNumber } from '../utils'

describe('formatNumber', () => {
	beforeEach(() => (console.error = jest.fn()))

	afterEach(() => jest.restoreAllMocks())

	it('with 0 -> returns empty string', () => {
		const result = formatNumber(0)
		expect(result).toBe('')
	})

	it('with undefined -> returns empty string', () => {
		const result = formatNumber(undefined)
		expect(result).toBe('')
	})

	it('with empty string -> returns empty string', () => {
		const result = formatNumber('')
		expect(result).toBe('')
	})

	it('with string number -> returns formatted string', () => {
		const result = formatNumber('1234.56')
		expect(result).toBe('1 234,56')
	})

	it('with real number -> returns formatted string', () => {
		const result = formatNumber(1234.56)
		expect(result).toBe('1 234,56')
	})

	it('with non-convertible string -> returns empty string and logs error', () => {
		const result = formatNumber('abc')
		expect(result).toBe('')
		expect(console.error).toHaveBeenCalledWith(
			'Provided value cannot be converted to a number.'
		)
	})

	it('with negative number -> returns formatted string', () => {
		const result = formatNumber(-1234.56)
		expect(result).toBe('-1 234,56')
	})

	it('with "0" string -> returns "0,00"', () => {
		const result = formatNumber('0')
		expect(result).toBe('0,00')
	})
})
