import { ICompany } from './company.interface'
import { IReport } from './report.interface'

export interface IData {
	userId: string
	userUid: string
	displayName?: string
	email: string
	companies: ICompany[]
	reports: IReport[]
}
