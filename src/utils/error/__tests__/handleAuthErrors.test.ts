import { FirebaseError } from 'firebase/app'
import { toast } from 'react-toastify'

import { handleAuthErrors } from '../utils'

//prettier-ignore
jest.mock('react-toastify', () => ({
	toast: {
		error: jest.fn()
	}
}))

class MockFirebaseError extends FirebaseError {
	code: string
	constructor(code: string, message: string) {
		super(message, code)
		this.code = code
		this.message = message
	}
}

describe('handleAuthErrors', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('with specific auth error -> shows corresponding message', () => {
		const error = new MockFirebaseError(
			'auth/wrong-password',
			'Wrong password.'
		)

		handleAuthErrors(error)

		expect(toast.error).toHaveBeenCalledWith('Неверный пароль.', {
			autoClose: 2000
		})
	})

	it('with generic error -> shows generic error message', () => {
		const error = new MockFirebaseError('generic-error', 'Some error occurred.')

		handleAuthErrors(error)

		expect(toast.error).toHaveBeenCalledWith('Что-то пошло не так', {
			autoClose: 2000
		})
	})
})
