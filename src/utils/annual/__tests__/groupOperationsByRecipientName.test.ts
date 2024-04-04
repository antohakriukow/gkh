import { IExtendedBankOperation } from '~/shared/types/annual.interface'

import { groupOperationsByRecipientName } from '../utils'

describe('groupOperationsByRecipientName', () => {
	it('groups operations by recipient name', () => {
		const operations = [
			{ _id: '1', recipientName: 'Company A', amount: 100 },
			{ _id: '2', recipientName: 'Company B', amount: 200 },
			{ _id: '3', recipientName: 'Company A', amount: 300 }
		] as IExtendedBankOperation[]

		const groupedOperations = groupOperationsByRecipientName(operations)
		expect(Object.keys(groupedOperations)).toEqual(['Company A', 'Company B'])
		expect(groupedOperations['Company A'].length).toEqual(2)
		expect(groupedOperations['Company B'].length).toEqual(1)
	})
})
