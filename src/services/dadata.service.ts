import { cloudFunction } from './_functions'

import { prepareCompanyData } from '~/utils/company/utils'

export const DadataService = {
	async getByInn(inn: string) {
		const data: any = await cloudFunction.getCompanyByInn(inn)
		return prepareCompanyData(data.data.data.suggestions[0].data)
	}
}
