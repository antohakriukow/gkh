import { IExtendedBankOperation } from '~/shared/types/annual.interface'

export type GroupedOperations = {
	[key: string]: IExtendedBankOperation[]
}
