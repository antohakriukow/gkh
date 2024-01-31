import { ICompany } from './company.interface'

export type TypeReport = '22gkh' | 'annual'
export type TypeAnnualDirection =
	| 'main'
	| 'renovation'
	| 'commerce'
	| 'target'
	| ''
	| undefined
export type TypeAnnualReportStructure =
	| 'cash/partners'
	| 'cash/services'
	| 'accruals/services'

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
	_id: string
	categoryId: string
	amount: number
	date: string
	description: string
}

export interface IAnnualCategory {
	_id: string // Уникальный идентификатор категории
	title: string // Название или описание категории
	children?: string[] // Дочерние категории (для удобства работы с деревом)
}

export interface IAnnualReportSettings {
	structure?: TypeAnnualReportStructure
	dataUploaded?: boolean
}

export interface IAnnualReportData {
	directions?: TypeAnnualDirection[]
	accounts?: IAccount[]
	categories?: IAnnualCategory[]
	operations?: IOperation[]
	settings?: IAnnualReportSettings
	temporary?: ITemporaryData
}

export interface ITemporaryData {
	files: File[]
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
