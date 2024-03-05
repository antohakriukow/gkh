import {
	IAnnualCategory,
	IExtendedBankOperation
} from '~/shared/types/annual.interface'

export interface IOperationGroup {
	name: string
	inn: string
	operations: IExtendedBankOperation[]
	total: number
}

export interface ICompanyOperations {
	[key: string]: {
		name: string
		inn: string
		operations: IExtendedBankOperation[]
		total: number
	}
}

export interface IRow {
	operations: IExtendedBankOperation[]
	category: IAnnualCategory
	isReportPayed: boolean
}

export interface IResultsRow {
	accruals: string
	income: string
	costs: string
	isReportPayed: boolean
}

export interface IAccountRow extends IResultsRow, Pick<IRow, 'operations'> {}
