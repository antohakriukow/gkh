import { ICompany } from '~/shared/types/company.interface'

import { prepareCompanyData } from '../utils'

describe('prepareCompanyData', () => {
	it('correctly prepares company data from API response', () => {
		const mockApiResponse = {
			inn: '1234567890',
			kpp: '0987654321',
			ogrn: '1023456789012',
			okpo: '12345678',
			opf: { short: 'ООО' },
			name: { short: 'ShortName', full: 'FullName' },
			management: { name: 'LeaderName', post: 'LeaderPost' },
			address: { value: 'TestAddress' }
		}

		const expected: ICompany = {
			inn: '1234567890',
			kpp: '0987654321',
			ogrn: '1023456789012',
			okpo: '12345678',
			name: { short: 'ShortName', full: 'FullName' },
			opf: 'ООО',
			leader_name: 'LeaderName',
			leader_post: 'LeaderPost',
			address: 'TestAddress',
			phone: '',
			email: ''
		}

		const result = prepareCompanyData(mockApiResponse)
		expect(result).toEqual(expected)
	})

	it('handles missing fields by setting them to empty strings', () => {
		const mockApiResponse = {}

		const expected: ICompany = {
			inn: '',
			kpp: '',
			ogrn: '',
			okpo: '',
			opf: '',
			name: { short: '', full: '' },
			leader_name: '',
			leader_post: '',
			address: '',
			phone: '',
			email: ''
		}

		const result = prepareCompanyData(mockApiResponse)
		expect(result).toEqual(expected)
	})
})
