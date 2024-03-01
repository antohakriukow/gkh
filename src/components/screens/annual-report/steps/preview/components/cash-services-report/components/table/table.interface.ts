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
}

export interface IResultsRow {
	accruals: string
	income: string
	costs: string
}

export interface IAccountRow extends IResultsRow, Pick<IRow, 'operations'> {}
