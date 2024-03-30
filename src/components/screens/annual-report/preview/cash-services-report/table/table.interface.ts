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

export interface ICashServicesTableProps {
	operations: IExtendedBankOperation[]
	categories: IAnnualCategory[]
}

export interface ICompanyRowProps {
	group: IOperationGroup
	isReportPayed: boolean
}

export interface IOperationRowProps {
	operation: IExtendedBankOperation
	isReportPayed: boolean
}

export interface IRowProps {
	operations: IExtendedBankOperation[]
	category: IAnnualCategory
	isReportPayed: boolean
}

export interface IResultsRowProps {
	accruals: string
	income: string
	costs: string
	isReportPayed: boolean
}

export interface IAccountRowProps
	extends IResultsRowProps,
		Pick<IRowProps, 'operations'> {
	isMain?: boolean
}
