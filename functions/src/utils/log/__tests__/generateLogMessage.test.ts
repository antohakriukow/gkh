import {
	generateLogMessageErrorMock,
	generateLogMessageInfoMock
} from '../mocks'
import { generateLogMessage } from '../utils'

describe('generateLogMessage', () => {
	describe('info level', () => {
		it('returns correct message for info level code', () => {
			generateLogMessageInfoMock.forEach(({ level, code, expected }) =>
				expect(generateLogMessage(level, code)).toEqual(expected)
			)
		})
	})

	describe('error level', () => {
		it('returns correct message for error level code', () => {
			generateLogMessageErrorMock.forEach(({ level, code, expected }) =>
				expect(generateLogMessage(level, code)).toEqual(expected)
			)
		})
	})
})
