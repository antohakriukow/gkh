import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

export const writePaymentInDB = functions.https.onRequest(
	async (request, response) => {
		if (request.method === 'POST') {
			const userId = '123123123l123'
			const shortId = 'A1001'
			const type = 'annual'
			const instanceId = '1708681948734'

			try {
				const payment = {
					paymentId: 123,
					paymentSum: 990,
					user: {
						_id: userId,
						shortId: shortId,
						email: 'example@mail.com'
					},
					data: request.body
				}

				await admin
					.database()
					.ref(`payments/${userId}/${type}/${instanceId}`)
					.update(payment)

				// response.status(200).send('OK')
			} catch (error) {}
		} else {
			// Если метод запроса не POST, отправляем код состояния 405 (Method Not Allowed)
			response.status(405).send('Only POST method is allowed')
		}
	}
)
