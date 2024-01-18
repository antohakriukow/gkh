import { generate22gkhReport } from './utils/generate22gkhReport'
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

export const generateFinalReport = functions.https.onCall(
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
			// Предполагается, что generate22gkhReport возвращает Promise<IFinalReport>
			const finalReport = await generate22gkhReport(userId, reportId)

			// Проверяем, что результат является IFinalReport
			if (typeof finalReport === 'object' && finalReport !== null) {
				// Записываем результат в Realtime Database
				await admin
					.database()
					.ref(`/users/${userId}/reports/${reportId}/finalReport`)
					.set(finalReport)

				// Получаем обновленные данные отчета
				const reportRef = admin
					.database()
					.ref(`/users/${userId}/reports/${reportId}`)
				const snapshot = await reportRef.once('value')
				const updatedReport = snapshot.val()

				return updatedReport
			} else {
				throw new Error(
					'Результат генерации не соответствует ожидаемому формату'
				)
			}
		} catch (error) {
			throw new functions.https.HttpsError(
				'unknown',
				'Произошла ошибка при генерации отчета'
			)
		}
	}
)
