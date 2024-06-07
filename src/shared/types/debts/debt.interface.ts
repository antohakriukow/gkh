import { ICollector } from './collector.interface'
import { IDebtor } from './debtor.interface'
import { IAddress } from './house.interface'

import { TypeDayOfMonth, TypeMonth } from '../period.interface'

export enum TypeDebt {
	main = 'основной долг',
	penalties = 'пени',
	duty = 'госпошлина'
}

export interface IPeriod {
	month: TypeMonth
	year: TypeDayOfMonth
}

export interface IDebtData {
	type: TypeDebt
	period: IPeriod
	value: string
	startDate: string
	endDate?: string
}

export interface IDebt {
	_id: string
	address: IAddress
	collector: ICollector
	debtor: IDebtor[]
	main: IDebtData[]
	penalties: IDebtData[]
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
