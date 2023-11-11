import { ICompany } from '~/shared/types/company.interface'

export interface IuiState {
	newCompany: ICompany | null
	currentCompany: ICompany | null
}
