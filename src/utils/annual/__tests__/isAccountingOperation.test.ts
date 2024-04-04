import {
	IAccountingOperation,
	IBankOperation
} from '~/shared/types/annual.interface'

import { isAccountingOperation } from '../utils'

describe('isAccountingOperation', () => {
	it('correctly identifies an accounting operation', () => {
		const operation = { debitAccount: '12345' } as
			| IAccountingOperation
			| IBankOperation
		expect(isAccountingOperation(operation)).toBeTruthy()
	})

	it('returns false for a bank operation', () => {
		const operation = { paymentPurpose: 'Utility Bill' } as
			| IAccountingOperation
			| IBankOperation
		expect(isAccountingOperation(operation)).toBeFalsy()
	})
})
