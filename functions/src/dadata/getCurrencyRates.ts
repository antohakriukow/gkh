import { Request, Response } from 'express'
import * as functions from 'firebase-functions'

export const getCurrencyRates = functions.https.onRequest(
	async (req: Request, res: Response) => {
		if (req.method !== 'GET') {
			res.status(405).send('Method Not Allowed')
			return
		}

		const currency: string = (req.query.currency as string) || 'RUB'

		const url =
			'http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/currency'
		const token = 'c1f8f04ab0c4878bc01856ad259766744778fbf4'

		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Token ${token}`
				},
				body: JSON.stringify({ query: currency })
			})

			if (!response.ok) {
				throw new Error('Failed to fetch data from DaData')
			}

			const data = await response.json()
			res.status(200).send(data)
		} catch (error) {
			console.error('Error fetching currency data:', error)
			res.status(500).send('Internal Server Error')
		}
	}
)
