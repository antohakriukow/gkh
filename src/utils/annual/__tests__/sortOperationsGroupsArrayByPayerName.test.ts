import { IExtendedBankOperation } from '~/shared/types/annual.interface'

import { sortOperationsGroupsArrayByPayerName } from '../utils'

describe('sortOperationsGroupsArrayByPayerName', () => {
	it('sorts groups of operations by payer name descending by number of operations', () => {
		const groupedOperations = {
			'Company X': [{}, {}, {}] as IExtendedBankOperation[],
			'Company Y': [{}, {}] as IExtendedBankOperation[],
			'Company Z': [{}] as IExtendedBankOperation[]
		}
		const sortedGroups = sortOperationsGroupsArrayByPayerName(groupedOperations)
		expect(sortedGroups[0].payerName).toEqual('Company X')
		expect(sortedGroups[1].payerName).toEqual('Company Y')
		expect(sortedGroups[2].payerName).toEqual('Company Z')
	})
})
