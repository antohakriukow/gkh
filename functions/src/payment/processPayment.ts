import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

export const processPayment = functions.https.onRequest(
	async (request, response) => {
		if (request.method === 'POST') {
			const payload = request.body

			const paymentSum = payload.OutSum.toFixed(2)
			const type = payload.Shp_type
			const instanceId = payload.Shp_instanceId
			const invoiceId = payload.InvId

			const userId = payload.Shp_userId
			const shortId = payload.Shp_shortId
			const email = payload.EMail ? payload.EMail : ''

			try {
				const payment = {
					paymentSum,
					invoiceId,
					type,
					instanceId,
					timestamp: Date.now(),
					user: {
						_id: userId,
						shortId,
						email
					}
				}

				await admin.database().ref(`payments/${userId}`).push(payment)

				response.status(200).send(`OK${invoiceId}`)
			} catch (error) {}
		} else {
			response.status(405).send('Only POST method is allowed')
		}
	}
)
