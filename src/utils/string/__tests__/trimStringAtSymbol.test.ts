import { trimStringAtSymbol } from '../utils'

describe('trimStringAtSymbol', () => {
	it('with symbol present -> trims string at symbol', () => {
		const str = 'hello@example.com'
		const expected = 'hello'
		expect(trimStringAtSymbol(str, '@')).toEqual(expected)
	})

	it('without symbol -> returns original string', () => {
		const str = 'hello'
		expect(trimStringAtSymbol(str, '@')).toEqual(str)
	})

	it('with symbol at the end -> trims everything after symbol', () => {
		const str = 'hello@'
		const expected = 'hello'
		expect(trimStringAtSymbol(str, '@')).toEqual(expected)
	})

	it('with multiple symbols -> trims at first occurrence of symbol', () => {
		const str = 'hello@example.com@domain.com'
		const expected = 'hello'
		expect(trimStringAtSymbol(str, '@')).toEqual(expected)
	})
})
