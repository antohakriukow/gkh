export interface IBankAccount {
	bankAcc: number
	bic: number
}

export interface ICompanyName {
	full: string
	short: string
}

export interface ICompany {
	inn: number
	kpp: number
	ogrn: number
	okpo: number
	name: ICompanyName
	leader_name: string
	leader_post: string
	address: string
	billingData?: IBankAccount
	phone: string
	email: string
}

export interface ICompanyInn extends Pick<ICompany, 'inn'> {}
