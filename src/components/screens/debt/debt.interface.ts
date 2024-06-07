import { Dispatch, ReactNode, SetStateAction } from 'react'

import { IDebtData, IDebtor, IHouse } from '~/shared/types/debts'

export type TypeStep = 1 | 2 | 3 | 4

export interface IContext {
	debtId: string | undefined
	isLoading: boolean
	step: TypeStep
	house: IHouse
	room: string
	debtor: IDebtor[]
	main: IDebtData[]
	penalties: IDebtData[]
	duty: string

	setIsLoading: Dispatch<SetStateAction<boolean>>
	setStep: Dispatch<SetStateAction<TypeStep>>
	setHouse: Dispatch<SetStateAction<IHouse>>
	setRoom: Dispatch<SetStateAction<string>>
	setDebtor: Dispatch<SetStateAction<IDebtor[]>>
	setMain: Dispatch<SetStateAction<IDebtData[]>>
	setPenalties: Dispatch<SetStateAction<IDebtData[]>>
	setDuty: Dispatch<SetStateAction<string>>
}

export interface IStep {
	id: TypeStep
	title: string
	component: ReactNode
	isDone: boolean
	color?: string
}
