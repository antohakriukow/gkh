import { Dispatch, ReactNode, SetStateAction } from 'react'

import {
	IAccount,
	IAccountingOperation,
	IBankOperation,
	TypeAnnualReportStructure
} from '~/shared/types/annual.interface'

type TypeStep = 1 | 2 | 3 | 4

export interface IContext {
	isLoading: boolean
	step: TypeStep
	annualOperations: IAccountingOperation[] | IBankOperation[]
	annualAccounts: IAccount[]
	annualFileNames: string[]
	annualStartDate: string
	annualFinalDate: string
	annualCompanyNames: string[]
	annualError: string
	structure: TypeAnnualReportStructure | undefined

	setIsLoading: Dispatch<SetStateAction<boolean>>
	setStep: Dispatch<SetStateAction<TypeStep>>
	setAnnualOperations: Dispatch<
		SetStateAction<IAccountingOperation[] | IBankOperation[]>
	>
	setAnnualAccounts: Dispatch<SetStateAction<IAccount[]>>
	setAnnualFileNames: Dispatch<SetStateAction<string[]>>
	setAnnualStartDate: Dispatch<SetStateAction<string>>
	setAnnualFinalDate: Dispatch<SetStateAction<string>>
	setAnnualCompanyNames: Dispatch<SetStateAction<string[]>>
	setAnnualError: Dispatch<SetStateAction<string>>
	setStructure: Dispatch<SetStateAction<TypeAnnualReportStructure | undefined>>
}

export interface IStep {
	id: TypeStep
	title: string
	component: ReactNode
	isDone: boolean
	color?: string
}
