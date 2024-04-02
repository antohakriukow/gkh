import { ICompany } from '~/shared/types/company.interface'

// Адаптирует полученный от API Dadata объект путем удаления лишних полей
export const prepareCompanyData = (data: any): ICompany => {
	return {
		inn: data?.inn ?? '',
		kpp: data?.kpp ?? '',
		ogrn: data?.ogrn ?? '',
		okpo: data?.okpo ?? '',
		opf: data?.opf?.short ?? '',
		name: {
			short: data?.name?.short ?? '',
			full: data?.name?.full ?? ''
		},
		leader_name: data?.management?.name ?? '',
		leader_post: data?.management?.post ?? '',
		address: data?.address?.value ?? '',
		phone: '',
		email: ''
	}
}

// Определяет, есть ли в незаполненные поля в данных о компании. Игнорирует поля email и phone
export const hasEmptyFields = (obj: ICompany) => {
	return Object.entries(obj).some(([key, value]) => {
		if (key === 'email' || key === 'phone') return false

		if (typeof value === 'string') return !value.trim()

		return value === null || value === undefined || value === ''
	})
}
