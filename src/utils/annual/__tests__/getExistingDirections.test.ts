import { IAccount } from '~/shared/types/annual.interface'

import { getExistingDirections } from '../utils'

describe('getExistingDirections', () => {
	it('returns an array of unique directions from accounts', () => {
		const accounts: IAccount[] = [
			{ type: 'main', number: '123' },
			{ type: 'renovation', number: '456' },
			{ type: 'main', number: '78.9' }
		]
		const expectedDirections = ['main', 'renovation']

		expect(getExistingDirections(accounts)).toEqual(expectedDirections)
	})
})
