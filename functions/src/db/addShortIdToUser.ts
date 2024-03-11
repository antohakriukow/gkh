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

		const usersRefMap = admin.database().ref(`users-ref`)

		try {
			const snapshot = await usersRefMap.once('value')
			let newShortId

			if (snapshot.exists()) {
				const usersMap = snapshot.val()
				const lastKey = Object.keys(usersMap).sort().pop()
				const lastShortId = usersMap[lastKey as string].shortId
				const shortIdNumber = parseInt(lastShortId.substring(1)) + 1
				newShortId = `A${shortIdNumber}`
			} else {
				// Если users-ref не существует, создаем с начальным shortId
				newShortId = 'A1625'
			}

			// Добавляем новый shortId в users-ref и обновляем shortId пользователя
			await usersRefMap.child(uid).set({ _id: uid, shortId: newShortId })
			await admin.database().ref(`users/${uid}`).update({ shortId: newShortId })
		} catch (error) {
			console.error('Error updating shortId: ', error)
			throw new functions.https.HttpsError(
				'unknown',
				'Failed to update shortId'
			)
		}

		const usersRef = admin.database().ref(`users/${uid}`)
		const snapshot = await admin.database().ref('users').once('value')
		const usersCount = snapshot.numChildren()
		const shortId = `A${1000 + usersCount}`

		await usersRef.update({ shortId })
	}
)
