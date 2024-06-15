import { IEntity as ICollector } from './counter-party.interface'
import { ICounterParty } from './counter-party.interface'
import { ICourt } from './court.interface'

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

export interface IPeriod {
	month: TypeMonth
	year: TypeYear
}

export interface IDebtOptions {
	direction: TypeDebtDirection
	withPenalties: TypePseudoBoolean
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
	value: string
}

export interface IPenalties {
	data: IPenaltyData[]
	total: string
}

export interface IDebt {
	_id: string
	address: string
	collector: ICollector
	debtor: ICounterParty
	court: ICourt
	main: IDebts
	penalties: IPenalties
	options: IDebtOptions
	duty: string
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
