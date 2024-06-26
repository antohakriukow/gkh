import { generateEnumKeyMap } from '~/utils/enum/enum.utils'

export enum TypeCourt {
	court = 'Суд',
	magistrate = 'Мировой суд'
}

export interface ICourt {
	type: TypeCourt
	name: string
	address: string
}

export const CourtTypes = generateEnumKeyMap(TypeCourt)
