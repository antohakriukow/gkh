import { ICompany } from './company.interface'
import {
	IReport22gkhData,
	Type22gkhReportTemplate
} from './report22gkh.interface'
import { TypeAnnualReportTemplate } from './reportAnnual.interface'

export type TypeReport = '22gkh' | 'annual'

export interface IReport {
	_id: number
	type: TypeReport
	template: TypeAnnualReportTemplate | Type22gkhReportTemplate
	company: ICompany
	data: IReport22gkhData
}
