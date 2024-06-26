import { IEntity } from './counter-party.interface'
import { ICounterParty } from './counter-party.interface'
import { ICourt } from './court.interface'
import { IAddress } from './house.interface'

import { generateEnumKeyMap } from '~/utils/enum/enum.utils'

import { TypeMonth, TypeYear } from '../period.interface'

export enum TypePseudoBoolean {
	yes = 'да',
	no = 'нет'
}

export enum TypeDebt {
	main = 'основной долг',
	penalties = 'пени',
	duty = 'госпошлина'
}

export enum TypeDebtDirection {
	maintenance = 'ЖКУ',
	renovation = 'Капремонт'
}

export type TypeRatePart = 130 | 300 | null

export const DebtDirectionTypes = generateEnumKeyMap(TypeDebtDirection)

export const isMainDirection = (value: TypeDebtDirection) =>
	value === DebtDirectionTypes.maintenance

export interface IPeriod {
	month: TypeMonth
	year: TypeYear
}

export interface IDebtOptions {
	direction: TypeDebtDirection
	withPenalties: TypePseudoBoolean
	attachments: string[]
}

export interface IDebtData {
	type: TypeDebt
	period: IPeriod
	value: string
	startDate: string
	endDate?: string
}

export interface IDebts {
	data: IDebtData[]
	total: string
}

export interface IPenaltyData {
	period: IPeriod
	startDate: string
	endDate: string
	daysCount: string
	rate: string
	ratePart: TypeRatePart
	value: string
}

export interface IPenalties {
	data: IPenaltyData[]
	total: string
}

export interface IDuty {
	value: string
	formula: string
}

export interface IBankDetails {
	account: string
	bank: {
		name: string
		bik: string
		correspondentAccount: string
	}
}

export interface ICollector extends IEntity {
	bankDetails?: IBankDetails
}

export interface IDebt {
	_id: string
	address: IAddress
	collector: ICollector
	debtor: ICounterParty
	court: ICourt
	main: IDebts
	penalties: IPenalties
	options: IDebtOptions
	duty: IDuty
	createdAt: string
	updatedAt: string
}

export interface IDebtCreate extends Pick<IDebt, 'collector'> {}

export interface IDebtDetails
	extends Pick<
		IDebt,
		| '_id'
		| 'collector'
		| 'address'
		| 'main'
		| 'penalties'
		| 'duty'
		| 'updatedAt'
	> {}
