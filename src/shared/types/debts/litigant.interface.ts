import { ICompany } from '../company.interface'

export enum TypeLitigant {
	individual = 'физическое лицо',
	entity = 'юридическое лицо'
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
		'name' | 'inn' | 'ogrn' | 'address' | 'leader_post' | 'leader_name'
	> {}

export interface IIndividual {
	name: string
	birthDate?: string
	birthPlace?: string
	livingAddress?: string
	identifiers: IIdentifier[]
}
