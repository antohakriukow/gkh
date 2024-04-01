import { IExtendedBankOperation } from '~/shared/types/annual.interface'

export type TypeGroupedOperations = {
	[key: string]: IExtendedBankOperation[]
}
