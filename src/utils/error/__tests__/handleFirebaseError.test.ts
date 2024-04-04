import { FirebaseError } from 'firebase/app'
import { toast } from 'react-toastify'

import { handleFirebaseError } from '../utils'

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

describe('handleFirebaseError', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('with known error code -> shows specific error message', () => {
		const errorMappings = [
			{ code: 'known-error', message: 'Known error occurred.' }
		]
		const error = new MockFirebaseError('known-error', 'Error message.')

		handleFirebaseError(error, errorMappings)

		expect(toast.error).toHaveBeenCalledWith('Known error occurred.', {
			autoClose: 2000
		})
	})

	it('with unknown error code -> shows generic error message', () => {
		const errorMappings = [
			{ code: 'known-error', message: 'Known error occurred.' }
		]
		const error = new MockFirebaseError('unknown-error', 'Error message.')

		handleFirebaseError(error, errorMappings)

		expect(toast.error).toHaveBeenCalledWith('Known error occurred.', {
			autoClose: 2000
		})
	})

	it('with no FirebaseError instance -> does nothing', () => {
		const error = new Error('Regular error')
		const errorMappings = [
			{ code: 'known-error', message: 'Known error occurred.' }
		]

		handleFirebaseError(error, errorMappings)

		expect(toast.error).not.toHaveBeenCalled()
	})
})
