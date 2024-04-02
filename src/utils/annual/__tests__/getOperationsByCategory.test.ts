import {
	IAnnualCategory,
	IExtendedBankOperation
} from '~/shared/types/annual.interface'

import { getOperationsByCategory } from '../utils'

describe('getOperationsByCategory', () => {
	it('filters operations by category, including all child categories', () => {
		const operations = [
			{ _id: '1', categoryId: '1', amount: 100 },
			{ _id: '2', categoryId: '2', amount: 200 },
			{ _id: '3', categoryId: '3', amount: 300 }
		] as IExtendedBankOperation[]

		const category = { id: '1', children: [{ id: '2' }] } as IAnnualCategory
		const filteredOperations = getOperationsByCategory(operations, category)
		expect(filteredOperations.length).toEqual(2)
		expect(filteredOperations).toEqual(
			expect.arrayContaining([operations[0], operations[1]])
		)
	})
})
