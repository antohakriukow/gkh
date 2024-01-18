import { getCheckList } from './utils/getCheckList'
import * as functions from 'firebase-functions'

export const check22gkhReport = functions.https.onCall(
	async (data, context) => {
		// Проверка аутентификации пользователя
		if (!context.auth) {
			throw new functions.https.HttpsError(
				'unauthenticated',
				'Пользователь не аутентифицирован'
			)
		}

		const userId = data.userId
		const reportId = data.reportId

		if (
			context.auth.uid !== data.userId &&
			context.auth.uid !== 'UgfYH10bRKbxcR5sYjZrMFydnb33'
		) {
			throw new functions.https.HttpsError('aborted', 'Недостаточно прав')
		}

		if (!reportId) {
			throw new functions.https.HttpsError(
				'invalid-argument',
				'Необходимо предоставить reportId'
			)
		}

		try {
			const checkList = await getCheckList(userId, reportId)
			const checkResults = checkList
				.filter(item => !item.condition())
				.map(({ type, message }) => ({ type, message }))

			// Здесь можно добавить логику для сохранения или обработки результатов проверки
			// Например, сохранение результатов в Firestore или Realtime Database

			return checkResults
		} catch (error) {
			console.error('Ошибка при проверке отчета:', error)
			throw new functions.https.HttpsError(
				'unknown',
				'Произошла ошибка при проверке отчета'
			)
		}
	}
)
