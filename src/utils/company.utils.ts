import { ICompany } from '~/shared/types/company.interface'

export const prepareCompanyData = (data: any): ICompany => ({
	inn: data.inn,
	kpp: data.kpp,
	ogrn: data.ogrn,
	okpo: data.ogrn,
	name: {
		short: data.name.short,
		full: data.name.full
	},
	leader_name: data.management.name,
	leader_post: data.management.post,
	address: data.address.value
})
