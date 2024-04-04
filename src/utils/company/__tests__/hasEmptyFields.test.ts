import { ICompany } from '~/shared/types/company.interface'

import { hasEmptyFields } from '../utils'

describe('hasEmptyFields', () => {
	it('returns true if there are empty fields other than email and phone', () => {
		const company: ICompany = {
			inn: '',
			kpp: '0987654321',
			ogrn: '1023456789012',
			okpo: '12345678',
			name: { short: 'ShortName', full: 'FullName' },
			opf: 'ООО',
			leader_name: 'LeaderName',
			leader_post: 'LeaderPost',
			address: 'TestAddress',
			phone: '1234567890',
			email: 'test@test.com'
		}

		expect(hasEmptyFields(company)).toBeTruthy()
	})

	it('returns false if all fields are filled except email and phone', () => {
		const company: ICompany = {
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

		expect(hasEmptyFields(company)).toBeFalsy()
	})

	it('considers fields with only whitespace as empty', () => {
		const company: ICompany = {
			inn: ' ',
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

		expect(hasEmptyFields(company)).toBeTruthy()
	})
})
