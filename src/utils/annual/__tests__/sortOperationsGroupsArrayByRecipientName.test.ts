import { IExtendedBankOperation } from '~/shared/types/annual.interface'

import { sortOperationsGroupsArrayByRecipientName } from '../utils'

describe('sortOperationsGroupsArrayByRecipientName', () => {
	it('sorts groups of operations by recipient name descending by number of operations', () => {
		const groupedOperations = {
			'Company A': [{}, {}, {}] as IExtendedBankOperation[],
			'Company B': [{}, {}] as IExtendedBankOperation[],
			'Company C': [{}] as IExtendedBankOperation[]
		}

		const sortedGroups =
			sortOperationsGroupsArrayByRecipientName(groupedOperations)
		expect(sortedGroups[0].recipientName).toEqual('Company A')
		expect(sortedGroups[1].recipientName).toEqual('Company B')
		expect(sortedGroups[2].recipientName).toEqual('Company C')
	})
})
