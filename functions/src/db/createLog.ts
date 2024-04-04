import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import { CallableContext } from 'firebase-functions/v1/https'

import { ILogDTO } from '../../../src/shared/types/log.interface'
import { generateLogMessage } from '../utils/log/utils'

export const createLog = functions.https.onCall(
	(data: ILogDTO, context: CallableContext) => {
		if (!context.auth) return

		if (!data || !data.level || !data.code || !data.user) {
			throw new functions.https.HttpsError(
				'invalid-argument',
				'Необходимые данные лога отсутствуют.'
			)
		}

		const logEntry = {
			timestamp: admin.database.ServerValue.TIMESTAMP,
			level: data.level,
			code: data.code,
			message: generateLogMessage(data.level, data.code),
			user: data.user,
			data: data.data || {}
		}

		return admin
			.database()
			.ref(`logs/${data.user.id}`)
			.push(logEntry)
			.then(() => {
				return { result: 'Лог успешно создан' }
			})
			.catch((error: any) => {
				throw new functions.https.HttpsError(
					'unknown',
					'Произошла ошибка при создании лога',
					error
				)
			})
	}
)
