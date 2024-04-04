import { replaceUndefinedAndNaNWithZero } from '../utils'

describe('replaceUndefinedAndNaNWithZero', () => {
	it('replaces undefined and NaN values with zero', () => {
		const obj = { a: undefined, b: NaN, c: 1, d: { e: NaN, f: undefined } }
		replaceUndefinedAndNaNWithZero(obj)
		expect(obj).toEqual({ a: 0, b: 0, c: 1, d: { e: 0, f: 0 } })
	})
})
