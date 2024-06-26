import { IDebt } from '~/shared/types/debts/debt.interface'

export interface IPrintData {
	type: 'pdf' | 'docx'
	printFunction: (debt: IDebt) => void
	title: string
}
