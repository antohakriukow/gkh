import { IMailData } from './mail.interface'
import * as functions from 'firebase-functions'
import * as nodemailer from 'nodemailer'

export const sendEmail = functions.https.onCall(
	async (data: IMailData, context) => {
		if (!context.auth) {
			throw new functions.https.HttpsError(
				'unauthenticated',
				'Пользователь не аутентифицирован'
			)
		}

		if (context.auth.uid !== 'UgfYH10bRKbxcR5sYjZrMFydnb33')
			throw new functions.https.HttpsError('aborted', 'Недостаточно прав')

		// Чтобы посмотреть конфиг введи в консоли firebase functions:config:get
		const email = functions.config().email.user
		const password = functions.config().email.pass

		const transporter = nodemailer.createTransport({
			host: 'smtp.yandex.ru',
			port: 465,
			secure: true,
			auth: {
				user: email,
				pass: password
			}
		})

		try {
			const info = await transporter.sendMail(data)
			return { messageId: info.messageId }
		} catch (error) {
			if (error instanceof Error) {
				throw new functions.https.HttpsError('internal', error.message)
			} else {
				throw new functions.https.HttpsError(
					'internal',
					'An unexpected error occurred'
				)
			}
		}
	}
)
