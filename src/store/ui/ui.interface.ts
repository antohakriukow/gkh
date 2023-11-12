import { ICompany } from '~/shared/types/company.interface'
import { TypePeriod, TypeYear } from '~/shared/types/period.interface'

export interface IuiState {
	newCompany: ICompany | null
	currentCompany: ICompany | null

	newReportYear: TypeYear | null
	newReportPeriod: TypePeriod | null
}
