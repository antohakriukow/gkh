import { ICompany } from '~/shared/types/company.interface'

// Адаптирует полученный от API Dadata объект путем удаления лишних полей
export const prepareCompanyData = (data: any): ICompany => {
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

// Определяет, есть ли в незаполненные поля в данных о компании. Игнорирует поля email и phone
export const hasEmptyFields = (obj: ICompany) => {
	return Object.entries(obj).some(([key, value]) => {
		if (key === 'email' || key === 'phone') {
			return false
		}

		return value === null || value === undefined || value === ''
	})
}
