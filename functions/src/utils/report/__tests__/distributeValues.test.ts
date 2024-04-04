import { distributeValues } from '../utils'

describe('distributeValues', () => {
	it('should distribute values across areas proportionally', () => {
		const inputObject = { a: 1200, b: 600 }
		const areaOne = 200
		const areaTwo = 100
		const areaThree = 100
		const expected = [
			{ a: 600, b: 300 },
			{ a: 300, b: 150 },
			{ a: 300, b: 150 }
		]
		expect(distributeValues(inputObject, areaOne, areaTwo, areaThree)).toEqual(
			expected
		)
	})

	it('should return empty objects if total area is 0', () => {
		const inputObject = { a: 1200, b: 600 }
		const areaOne = 0
		const areaTwo = 0
		const areaThree = 0
		const expected = [{}, {}, {}]
		expect(distributeValues(inputObject, areaOne, areaTwo, areaThree)).toEqual(
			expected
		)
	})
})
