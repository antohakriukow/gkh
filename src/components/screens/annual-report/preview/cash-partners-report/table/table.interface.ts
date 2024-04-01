import { IExtendedBankOperation } from '~/shared/types/annual.interface'

export interface IOperationGroup {
	name: string
	INN: string
	operations: IExtendedBankOperation[]
	total: number
}

export interface IGroupedOperations {
	[key: string]: {
		total: number
		groups: Record<string, IOperationGroup>
		expanded: boolean
	}
}

export interface IOperationGroupProps {
	group: IOperationGroup
	isReportPayed: boolean
}

export interface IResultRowProps {
	toggleGroup: (groupKey: string) => void
	isReportPayed: boolean
	typeKey: string
	total: number
	expanded: boolean
}

export interface IRowProps {
	operation: IExtendedBankOperation
	isReportPayed: boolean
}

export interface IBankOperationsTableProps {
	operations: IExtendedBankOperation[]
}
