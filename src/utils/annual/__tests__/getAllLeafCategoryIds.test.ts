import { IAnnualCategory } from '~/shared/types/annual.interface'

import { getAllLeafCategoryIds } from '../utils'

describe('getAllLeafCategoryIds', () => {
	it('retrieves all leaf category IDs, including nested ones', () => {
		const categories = [
			{ id: '1', children: [{ id: '2' }] },
			{ id: '3' }
		] as IAnnualCategory[]

		const leafIds = getAllLeafCategoryIds(categories)
		expect(leafIds).toEqual(['2', '3'])
	})
})
