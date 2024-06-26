import { TypeRatePart } from '~/shared/types/debts/debt.interface'

export type PreviousIntervalsData = [number, TypeRatePart][]

export type TypeRateData = [string, number]

export interface IDebtInterval {
	startDate: string
	endDate: string
	rate: number
	ratePart: TypeRatePart
	daysCount: number
}
