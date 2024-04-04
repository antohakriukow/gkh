import { IAnnualCategory } from '~/shared/types/annual.interface'

import { getAllCategoryIds } from '../utils'

describe('getAllCategoryIds', () => {
	it('recursively collects all category and subcategory IDs', () => {
		const category = {
			id: '1',
			children: [{ id: '2', children: [{ id: '3' }] }]
		} as IAnnualCategory

		const allIds = getAllCategoryIds(category)
		expect(allIds).toEqual(['1', '2', '3'])
	})
})
