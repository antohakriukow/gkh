import { IAnnualReport } from '~/shared/types/annual.interface'
import { ICompany } from '~/shared/types/company.interface'
import { IReport } from '~/shared/types/report.interface'

export interface IuiState {
	currentCompany: ICompany | null
	currentReport: IReport | null
	currentAnnualReport: IAnnualReport | null
	annualReportInitialDataSavedToDb: boolean
	isLoading: boolean

	newCompany: ICompany | null
}
