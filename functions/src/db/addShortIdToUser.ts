import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

export const addShortIdToUser = functions.https.onCall(
	async (data, context) => {
		const uid = context.auth?.uid

		if (!uid) {
			throw new functions.https.HttpsError(
				'unauthenticated',
				'The user must be authenticated to add a short ID.'
			)
		}

		const usersRefMap = admin.database().ref(`users-ref`)

		try {
			const snapshot = await usersRefMap.once('value')
			let newShortIdNumber

			if (snapshot.exists()) {
				const usersMap = snapshot.val()
				const lastShortId = Object.keys(usersMap).sort().pop() // Получаем последний shortId как ключ
				newShortIdNumber = parseInt((lastShortId as string).substring(1)) + 1 // Инкрементируем числовую часть shortId
			} else {
				// Если users-ref не существует, начинаем сначала
				newShortIdNumber = 1001
			}

			const newShortId = `A${newShortIdNumber}`

			// Добавляем новый shortId в users-ref с UID пользователя в качестве значения
			await usersRefMap.child(newShortId).set(uid)

			// Обновляем shortId пользователя
			await admin.database().ref(`users/${uid}`).update({ shortId: newShortId })
		} catch (error) {
			console.error('Error adding shortId to user:', error)
			throw new functions.https.HttpsError(
				'unknown',
				'Failed to add shortId to user.'
			)
		}
	}
)
