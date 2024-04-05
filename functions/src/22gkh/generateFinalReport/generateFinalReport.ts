import { generate22gkhReport2023 } from './utils/generate22gkhReport2023'
import { generate22gkhReport2024 } from './utils/generate22gkhReport2024'
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

import { getReportYear } from '../utils/getReportYear'

export const generateFinalReport = functions.https.onCall(
	async (data, context) => {
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
			const currentReportYear = await getReportYear(userId, reportId)

			let finalReport = {}

			finalReport =
				currentReportYear?.toFixed(0) === '2024'
					? await generate22gkhReport2024(userId, reportId)
					: await generate22gkhReport2023(userId, reportId)

			if (typeof finalReport === 'object' && finalReport !== null) {
				await admin
					.database()
					.ref(`/users/${userId}/reports/${reportId}/finalReport`)
					.set(finalReport)

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
				'Ошибка при генерации отчета',
				error
			)
		}
	}
)
