import { areArraysEqualByKey } from '../utils'

describe('areArraysEqualByKey', () => {
	it('with equal arrays by key -> returns true', () => {
		const arr1 = [
			{ id: 1, value: 'a' },
			{ id: 2, value: 'b' }
		]
		const arr2 = [
			{ id: 2, value: 'b' },
			{ id: 1, value: 'a' }
		]
		const result = areArraysEqualByKey(arr1, arr2, 'id', 'value')
		expect(result).toBe(true)
	})

	it('with unequal arrays by key -> returns false', () => {
		const arr1 = [
			{ id: 1, value: 'a' },
			{ id: 2, value: 'b' }
		]
		const arr2 = [
			{ id: 2, value: 'c' },
			{ id: 1, value: 'd' }
		]
		const result = areArraysEqualByKey(arr1, arr2, 'id', 'value')
		expect(result).toBe(false)
	})

	it('with arrays of different lengths -> returns false', () => {
		const arr1 = [{ id: 1, value: 'a' }]
		const arr2 = [
			{ id: 1, value: 'a' },
			{ id: 2, value: 'b' }
		]
		const result = areArraysEqualByKey(arr1, arr2, 'id', 'value')
		expect(result).toBe(false)
	})

	it('with empty arrays -> returns true', () => {
		const arr1: [] = []
		const arr2: [] = []
		const result = areArraysEqualByKey(arr1, arr2, 'id', 'value')
		expect(result).toBe(true)
	})

	it('with arrays having non-string comparator -> works correctly', () => {
		const arr1 = [
			{ id: 1, age: 30 },
			{ id: 2, age: 25 }
		]
		const arr2 = [
			{ id: 2, age: 25 },
			{ id: 1, age: 30 }
		]
		const result = areArraysEqualByKey(arr1, arr2, 'age', 'id')
		expect(result).toBe(true)
	})
})
