import {
	IAccount,
	IAnnualCategory,
	IExtendedAccountingOperation,
	IExtendedBankOperation,
	TypeAnnualDirection
} from '~/shared/types/annual.interface'

export type TypeLevel = 0 | 1 | 2 | 3

export interface ICompanyOperations {
	[key: string]: {
		name: string
		key: string
		operations: IExtendedAccountingOperation[]
		total: number
	}
}

export interface IAccountData {
	accruals: number
	costs: number
	operations: IExtendedAccountingOperation[]
	account: string
}

export interface IAccountRow extends IAccountData {
	isReportPayed: boolean
	direction: TypeAnnualDirection
	level: TypeLevel
	accounts: IAccount[]
}
