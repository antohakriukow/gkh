import { ICompany } from '~/shared/types/company.interface'

export interface IDropDownItem extends Pick<ICompany, 'inn' | 'name'> {
	onClick: (inn: number) => void
}

export interface IDropDown {
	data: ICompany[]
	onClick: () => void
}
