import * as functions from 'firebase-functions'

export const getCompanyByInn = functions.https.onCall(async (data, context) => {
	// Проверяем, передан ли INN
	if (!data.inn) {
		throw new functions.https.HttpsError('invalid-argument', 'INN is required')
	}

	const url =
		'https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party'
	const token = 'c1f8f04ab0c4878bc01856ad259766744778fbf4'

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Token ${token}`
			},
			body: JSON.stringify({ query: data.inn })
		})

		if (!response.ok) {
			throw new functions.https.HttpsError(
				'internal',
				'Failed to fetch data from DaData'
			)
		}

		const result = await response.json()
		return { data: result }
	} catch (error) {
		console.error('Error fetching data from DaData:', error)
		throw new functions.https.HttpsError(
			'internal',
			'Failed to fetch data from DaData'
		)
	}
})
