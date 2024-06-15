import { ICompany } from '../company.interface'

export enum TypeCounterParty {
	individual = 'Физическое лицо',
	entity = 'Юридическое лицо'
}

export enum TypeIdentifier {
	passport = 'Паспорт',
	snils = 'СНИЛС',
	inn = 'ИНН',
	ogrnip = 'ОГРНИП',
	driverLicense = 'Водительское удостоверение'
}

export interface IIdentifier {
	type: TypeIdentifier
	value: string
}

export interface IEntity
	extends Pick<
		ICompany,
		'inn' | 'ogrn' | 'address' | 'leader_post' | 'leader_name'
	> {
	name: string
}

export interface IIndividual {
	name: string
	birthDate?: string
	birthPlace?: string
	livingAddress?: string
	identifier: IIdentifier
}

interface IIndividualCounterParty {
	type: TypeCounterParty.individual
	data: IIndividual
}

interface IEntityCounterParty {
	type: TypeCounterParty.entity
	data: IEntity
}

export type ICounterParty = IIndividualCounterParty | IEntityCounterParty
