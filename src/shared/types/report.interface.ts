import { ICompany } from './company.interface'
import {
	IReport22gkhData,
	Type22gkhReportTemplate
} from './report22gkh.interface'
import { TypeAnnualReportTemplate } from './reportAnnual.interface'

export type TypeReport = '22gkh' | 'annual'

export interface IFinalReport {
	1: Object
	2: Object
	3: Object
	4: Object
}

export interface IReport {
	_id: number
	type: TypeReport
	year: number
	period: number
	template: TypeAnnualReportTemplate | Type22gkhReportTemplate
	company: ICompany
	data: IReport22gkhData
	createdAt: string
	updatedAt: string
	finalReport?: IFinalReport
}

export interface IReportCreate
	extends Pick<IReport, 'type' | 'year' | 'period' | 'company'> {}

export interface IReportTableItem
	extends Pick<IReport, 'type' | 'year' | 'period' | 'updatedAt' | '_id'> {}
