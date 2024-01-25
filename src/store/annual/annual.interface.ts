import {
	IAccount,
	IAccountingOperation,
	IBankOperation
} from '~/shared/types/annual.interface'

export interface AnnualState {
	fileNames: string[]
	accounts: IAccount[]
	operations: IAccountingOperation[] | IBankOperation[]
	startDate?: number
	finalDate?: number
}
