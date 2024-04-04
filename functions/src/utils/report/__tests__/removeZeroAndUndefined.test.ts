import { removeZeroAndUndefined } from '../utils'

describe('removeZeroAndUndefined', () => {
	it('should remove all fields with 0 or undefined values', () => {
		const input = { a: 1, b: 0, c: undefined, d: 2 }
		const expected = { a: 1, d: 2 }
		expect(removeZeroAndUndefined(input)).toEqual(expected)
	})

	it('should return the same object if no fields with 0 or undefined values', () => {
		const input = { a: 1, d: 2 }
		const expected = { a: 1, d: 2 }
		expect(removeZeroAndUndefined(input)).toEqual(expected)
	})

	it('should handle nested objects', () => {
		const input = { a: { b: 0, c: 1 }, d: { e: undefined, f: 2 } }
		const expected = { a: { c: 1 }, d: { f: 2 } }
		expect(removeZeroAndUndefined(input)).toEqual(expected)
	})
})
