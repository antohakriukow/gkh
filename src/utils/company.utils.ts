import { ICompany } from '~/shared/types/company.interface'

export const prepareCompanyData = (data: any): ICompany => {
	console.log(data)
	return {
		inn: !!data?.inn ? data?.inn : '',
		kpp: !!data?.kpp ? data?.kpp : '',
		ogrn: !!data?.ogrn ? data?.ogrn : '',
		okpo: !!data?.okpo ? data?.okpo : '',
		name: {
			short: !!data?.name?.short ? data?.name?.short : '',
			full: !!data?.name?.full ? data?.name?.full : ''
		},
		leader_name: !!data?.management?.name ? data?.management?.name : '',
		leader_post: !!data?.management?.post ? data?.management?.post : '',
		address: !!data?.address?.value ? data?.address?.value : '',
		phone: '',
		email: ''
	}
}
