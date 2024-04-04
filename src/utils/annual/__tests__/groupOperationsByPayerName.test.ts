import { IExtendedBankOperation } from '~/shared/types/annual.interface'

import { groupOperationsByPayerName } from '../utils'

describe('groupOperationsByPayerName', () => {
	it('groups operations by payer name', () => {
		const operations = [
			{ _id: '1', payerName: 'Company X', amount: 100 },
			{ _id: '2', payerName: 'Company Y', amount: 200 },
			{ _id: '3', payerName: 'Company X', amount: 300 }
		] as IExtendedBankOperation[]

		const groupedOperations = groupOperationsByPayerName(operations)
		expect(Object.keys(groupedOperations)).toEqual(['Company X', 'Company Y'])
		expect(groupedOperations['Company X'].length).toEqual(2)
		expect(groupedOperations['Company Y'].length).toEqual(1)
	})
})
