import { IAccount } from '~/shared/types/annual.interface'

import { createMockCategoriesFromAccounts } from '../utils'

describe('createMockCategoriesFromAccounts', () => {
	const accounts: IAccount[] = [
		{ type: 'main', number: '001' },
		{ type: 'renovation', number: '002' },
		{ type: 'target', number: '003' },
		{ type: 'target', number: '004' }
	]

	it('creates mock categories from accounts for specified direction', () => {
		expect(createMockCategoriesFromAccounts(accounts, 'renovation')).toEqual([
			{ id: '1001', value: '002' }
		])
		expect(createMockCategoriesFromAccounts(accounts, 'target')).toEqual([
			{ id: '2001', value: '003' },
			{ id: '2002', value: '004' }
		])
		expect(createMockCategoriesFromAccounts(accounts, 'main')).toEqual([
			{ id: '3001', value: '001' }
		])
	})

	it('returns undefined if direction does not exist in accounts', () => {
		expect(createMockCategoriesFromAccounts(accounts, 'commerce')).toEqual(
			undefined
		)
	})
})
