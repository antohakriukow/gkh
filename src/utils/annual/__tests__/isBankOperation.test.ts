import {
	IAccountingOperation,
	IBankOperation
} from '~/shared/types/annual.interface'

import { isBankOperation } from '../utils'

describe('isBankOperation', () => {
	it('correctly identifies a bank operation', () => {
		const operation = { paymentPurpose: 'Utility Bill' } as
			| IAccountingOperation
			| IBankOperation
		expect(isBankOperation(operation)).toBeTruthy()
	})

	it('returns false for an accounting operation', () => {
		const operation = { debitAccount: '12345' } as
			| IAccountingOperation
			| IBankOperation
		expect(isBankOperation(operation)).toBeFalsy()
	})
})
