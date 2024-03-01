import { IAnnualReport } from './annual.interface'
import { ICompany } from './company.interface'
import { IReport } from './report.interface'

export interface IData {
	userId: string
	userUid: string
	displayName?: string
	email: string
	needToShowIntro: boolean
	currentCompanyInn: string
	companies: ICompany[]
	reports: IReport[]
	annuals: IAnnualReport[]
}
