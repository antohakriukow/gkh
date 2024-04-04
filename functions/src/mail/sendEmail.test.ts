import { IMailData } from './mail.interface'
import { sendEmail } from './sendEmail'
import * as functions from 'firebase-functions-test'
import * as nodemailer from 'nodemailer'

jest.mock('nodemailer', () => ({
	createTransport: jest.fn().mockReturnValue({
		sendMail: jest.fn().mockResolvedValue({ messageId: 'someMessageId' })
	})
}))

const nodemailerMock = nodemailer.createTransport as jest.Mock

jest.mock('firebase-functions', () => {
	const originalModule = jest.requireActual('firebase-functions')

	return {
		...originalModule,
		config: () => ({
			email: {
				user: 'test@example.com',
				pass: 'password'
			}
		})
	}
})

const testEnv = functions()

describe('sendEmail Cloud Function', () => {
	let wrappedSendEmail: any

	beforeAll(() => {
		jest.resetModules()
		wrappedSendEmail = testEnv.wrap(sendEmail)
	})

	it('should send email and return messageId on success', async () => {
		const context = { auth: { uid: 'UgfYH10bRKbxcR5sYjZrMFydnb33' } }
		const data: IMailData = {
			from: 'sender@mail.com',
			to: 'receiver@mail.com',
			subject: 'mail subject',
			text: 'mail text',
			html: '<mail html />'
		}
		const messageId = 'someMessageId'

		nodemailerMock.mockReturnValue({
			sendMail: jest.fn().mockResolvedValue({ messageId })
		})

		const result = await wrappedSendEmail(data, { auth: context.auth })
		expect(result).toEqual({ messageId })
		expect(nodemailerMock().sendMail).toHaveBeenCalledWith(data)
	})

	afterAll(() => {
		testEnv.cleanup()
	})
})
