export interface IBankAccount {
	bankAcc: number
	bic: number
}
export interface ICompany {
	inn: number
	kpp: number
	ogrn: number
	okpo: number
	name: string
	leader_name: string
	leader_post: string
	address: string
	billingData?: IBankAccount
}
