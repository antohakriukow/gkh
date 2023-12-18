import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

export const addShortIdToUser = functions.https.onCall(
	async (data, context) => {
		const uid = context.auth?.uid

		if (!uid) {
			throw new functions.https.HttpsError(
				'unauthenticated',
				'User must be authenticated'
			)
		}

		const usersRef = admin.database().ref(`users/${uid}`)
		const snapshot = await admin.database().ref('users').once('value')
		const usersCount = snapshot.numChildren()
		const shortId = `A${1000 + usersCount}`

		await usersRef.update({ shortId })
	}
)
