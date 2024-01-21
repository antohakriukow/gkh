import { ICompany } from './company.interface'

export type TypeAnnualDirection = 'main' | 'renovation' | 'commerce' | 'target'
export type TypeReport = '22gkh' | 'annual'

// //  Формат исходных данных после парсинга:

// Исходный формат операции в журнале проводок 1С
export interface IAccountingOperation {
	date: string
	document: string
	debitAccount: string
	debitSubaccount1: string
	debitSubaccount2: string
	debitSubaccount3: string
	creditAccount: string
	creditSubaccount1: string
	creditSubaccount2: string
	creditSubaccount3: string
	amount: string
	description: string
}

// Исходный формат строки в банковской выписке
export interface IBankOperation {
	documentNumber: string
	date: string
	amount: number
	payerAccount: string
	payerName: string
	payerINN: string
	payerKPP: string
	payerCheckingAccount: string
	recipientAccount: string
	recipientName: string
	recipientINN: string
	recipientCheckingAccount: string
	budgetClassificationCode: string
	paymentPriority: number
	paymentPurpose: string
}

// Банковский счет или счет бухгалтерского учета
export interface IAccount {
	type: TypeAnnualDirection
	number: string
}

// //  Формат исходных данных для работы:

export interface IOperation {
	id: string // Уникальный идентификатор операции
	categoryId: string // Идентификатор категории, к которой относится операция
	amount: number // Сумма расхода
	date: string // Дата операции (может быть в любом формате, удобном для работы)
	description: string // Описание операции
}

export interface ICategory {
	id: string // Уникальный идентификатор категории
	child?: string // Идентификатор дочерней категории
	sibling?: string // Идентификатор соседней категории
	title: string // Название или описание категории
	children?: ICategory[] // Дочерние категории (для удобства работы с деревом)
}

export interface IAnnualReportData {
	directions: TypeAnnualDirection[]
	accounts: IAccount[]
	categories: ICategory[]
	operations: IOperation[]
}

export interface IAnnualReport {
	_id: number
	type: TypeReport
	startDate: number
	finalDate: number
	company: ICompany
	data: IAnnualReportData
	createdAt: string
	updatedAt: string
}

export interface IAnnualReportCreate
	extends Pick<IAnnualReport, 'type' | 'company'> {}
