import { getAnnualDirectionTitle } from '../utils'

describe('getAnnualDirectionTitle', () => {
	it('returns correct direction title for each type', () => {
		expect(getAnnualDirectionTitle('main')).toEqual('ЖКУ')
		expect(getAnnualDirectionTitle('renovation')).toEqual('Капитальный ремонт')
		expect(getAnnualDirectionTitle('commerce')).toEqual(
			'Коммерческая деятельность'
		)
		expect(getAnnualDirectionTitle('target')).toEqual('Целевые взносы')
	})

	it('returns an empty string for undefined or unknown directions', () => {
		expect(getAnnualDirectionTitle(undefined)).toEqual('')
		expect(getAnnualDirectionTitle('unknown')).toEqual('')
	})
})
