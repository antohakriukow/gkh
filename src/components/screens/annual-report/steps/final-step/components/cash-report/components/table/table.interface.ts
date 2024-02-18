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
