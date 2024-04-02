import { removeCollapsedFromCategories } from '../utils'

describe('removeCollapsedFromCategories', () => {
	it('removes collapsed property from categories and returns new array', () => {
		const inputCategories = [
			{ id: '1', value: 'Category 1', collapsed: true },
			{
				id: '2',
				value: 'Category 2',
				collapsed: false,
				children: [{ id: '3', value: 'Subcategory', collapsed: true }]
			}
		]
		const expectedOutput = [
			{ id: '1', value: 'Category 1' },
			{
				id: '2',
				value: 'Category 2',
				children: [{ id: '3', value: 'Subcategory' }]
			}
		]

		expect(removeCollapsedFromCategories(inputCategories)).toEqual(
			expectedOutput
		)
	})
})
