import axios from 'axios'

import { prepareCompanyData } from '~/utils/company.utils'

const url =
	'https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party'
const token = process.env.REACT_APP_DADATA_API_KEY
const options = {
	mode: 'cors',
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
		Authorization: 'Token ' + token
	}
}

export const DadataService = {
	async getByInn(inn: string) {
		return axios
			.post(url, { query: inn }, options)
			.then(data => prepareCompanyData(data.data.suggestions[0].data))
	}
}
