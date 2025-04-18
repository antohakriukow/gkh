import { ICompany } from '~/shared/types/company.interface'
import { IReport } from '~/shared/types/report.interface'

export interface IuiState {
	currentCompany: ICompany | null
	newCompany: ICompany | null
	currentReport: IReport | null
}
