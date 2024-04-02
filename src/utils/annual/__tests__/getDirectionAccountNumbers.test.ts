import { AnnualState } from '~/shared/types/annual.interface'

import { getDirectionAccountNumbers } from '../utils'

describe('getDirectionAccountNumbers', () => {
	it('extracts account numbers for a given direction', () => {
		const state = {
			accounts: [
				{ type: 'main', number: '12345' },
				{ type: 'renovation', number: '67890' },
				{ type: 'main', number: '54321' }
			]
		} as AnnualState
		const direction = 'main'

		const accountNumbers = getDirectionAccountNumbers(state, direction)
		expect(accountNumbers).toEqual(['12345', '54321'])
	})

	it('returns an empty array if no accounts match the direction', () => {
		const state = {
			accounts: [
				{ type: 'renovation', number: '67890' },
				{ type: 'commerce', number: '54321' }
			]
		} as AnnualState
		const direction = 'main'

		const accountNumbers = getDirectionAccountNumbers(state, direction)
		expect(accountNumbers).toHaveLength(0)
	})
})
