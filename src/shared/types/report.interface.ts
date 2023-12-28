import { ICompany } from './company.interface'
import {
	IAccruals,
	IArea,
	IElevator,
	IGasBoiler,
	IRenovation,
	IReport22gkhData,
	ISettings,
	IStove,
	IWaterHeating,
	Type22gkhReportTemplate
} from './report22gkh.interface'
import { TypeAnnualReportTemplate } from './reportAnnual.interface'

export type TypeReport = '22gkh' | 'annual'

interface ISubSection {
	[key: number]: any
}

interface ISection {
	[key: number]: ISubSection
}

export interface IFinalReport {
	1: ISection
	2: ISection
	3: ISection
	4: ISection
	generatedAt: string
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
	extends Pick<IReport, 'type' | 'year' | 'period' | 'company'> {
	data: {
		accruals?: IAccruals
		area?: IArea
		elevator?: IElevator
		gasBoiler?: IGasBoiler
		renovation?: IRenovation
		settings?: ISettings
		stove?: IStove
		waterHeating?: IWaterHeating
	}
}

export interface IReportTableItem
	extends Pick<IReport, 'type' | 'year' | 'period' | 'updatedAt' | '_id'> {}
