import { TypeAnnualReportStructure } from './../../shared/types/annual.interface'

import {
	IAccount,
	IAccountingOperation,
	IBankOperation
} from '~/shared/types/annual.interface'

export interface AnnualState {
	fileNames: string[]
	accounts: IAccount[]
	operations: IAccountingOperation[] | IBankOperation[]
	structure?: TypeAnnualReportStructure
	startDate?: string
	finalDate?: string
	error?: string
}
