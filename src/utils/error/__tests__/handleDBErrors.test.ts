import { FirebaseError } from 'firebase/app'
import { toast } from 'react-toastify'

import { handleDBErrors } from '../utils'

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

describe('handleDBErrors', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('with specific database error -> shows corresponding message', () => {
		const error = new MockFirebaseError(
			'permission_denied',
			'Permission denied.'
		)

		handleDBErrors(error)

		expect(toast.error).toHaveBeenCalledWith('Ошибка доступа.', {
			autoClose: 2000
		})
	})

	it('with generic error -> shows generic error message', () => {
		const error = new MockFirebaseError('generic-error', 'Some error occurred.')

		handleDBErrors(error)

		expect(toast.error).toHaveBeenCalledWith('Что-то пошло не так', {
			autoClose: 2000
		})
	})
})
