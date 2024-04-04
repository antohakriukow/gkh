import {
	IExtendedAccountingOperation,
	IExtendedBankOperation
} from '~/shared/types/annual.interface'

import { isExtendedBankOperation } from '../utils'

describe('isExtendedBankOperation', () => {
	it('correctly identifies an extended bank operation', () => {
		const operation = { paymentPurpose: 'Utility Bill', _id: 'op123' } as
			| IExtendedAccountingOperation
			| IExtendedBankOperation
		expect(isExtendedBankOperation(operation)).toBeTruthy()
	})

	it('returns false for an extended accounting operation', () => {
		const operation = { debitAccount: '12345', _id: 'op123' } as
			| IExtendedAccountingOperation
			| IExtendedBankOperation
		expect(isExtendedBankOperation(operation)).toBeFalsy()
	})
})
