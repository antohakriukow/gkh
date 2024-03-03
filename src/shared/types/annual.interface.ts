import { ICompany } from './company.interface'

export type TypeReport = '22gkh' | 'annual'
export type TypeAnnualDirection =
	| 'main'
	| 'renovation'
	| 'commerce'
	| 'target'
	| ''
	| undefined

export type TypeDefinedAnnualDirection = Exclude<
	TypeAnnualDirection,
	'' | undefined
>

export type TypeCategoriesMap = {
	[K in TypeDefinedAnnualDirection]?: IAnnualCategory[]
}

export type TypeAnnualReportStructure =
	| 'cash/partners'
	| 'cash/services'
	| 'accruals/services'

export type TypeAnnualOperationTag =
	| 'ownersIncome'
	| 'commercialIncome'
	| 'percents'
	| 'fkr'
	| 'partnerCashback'
	| 'internal'
	| 'other'
	| ''
	| undefined

// Банковский счет или счет бухгалтерского учета
export interface IAccount {
	type: TypeAnnualDirection
	number: string
}

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
	amount: number
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
	tag?: TypeAnnualOperationTag
}

export interface IExtendedBankOperation
	extends Omit<
		IBankOperation,
		'payerKPP' | 'payerCheckingAccount' | 'recipientCheckingAccount'
	> {
	_id: string
	direction: TypeAnnualDirection
	categoryId: string
}

export interface IOperation {
	_id: string
	direction: TypeAnnualDirection
	categoryId: string
	amount: number
	date: string
	document: string
	description: string
	partnerName?: string
}

export interface IExtendedAccountingOperation extends IAccountingOperation {
	_id: string
	direction: TypeAnnualDirection
	categoryId: string
}

export interface IAnnualCategory {
	id: string
	value: string
	amount?: number
	calculatedIncome?: number
	children?: IAnnualCategory[]
}

export interface IAnnualCategoryState extends IAnnualCategory {
	collapsed: boolean
}

export interface IAnnualReportSettings {
	structure?: TypeAnnualReportStructure
	dataUploaded?: boolean
}

export interface IAnnualReportData {
	directions?: TypeAnnualDirection[]
	accounts?: IAccount[]
	categories?: TypeCategoriesMap
	operations?: IExtendedBankOperation[] | IExtendedAccountingOperation[]
	bankOperations?: IExtendedBankOperation[]
	accountingOperations?: IExtendedAccountingOperation[]
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

export interface IAnnualStepData {
	title: string
	direction: TypeDefinedAnnualDirection
}
