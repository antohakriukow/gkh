import { extractLastLink } from '../utils'

describe('extractLastLink', () => {
	it('with normal values -> returns string', () => {
		expect(extractLastLink('a.b.c')).toEqual('c')
		expect(extractLastLink('.a')).toEqual('a')
		expect(extractLastLink('a')).toEqual('a')
	})

	it('throws TypeError when called with undefined', () => {
		expect(() => extractLastLink(undefined)).toThrow(TypeError)
		expect(() => extractLastLink(undefined)).toThrow('Expected a string')
	})

	it('throws TypeError when called with null', () => {
		expect(() => extractLastLink(null)).toThrow(TypeError)
		expect(() => extractLastLink(null)).toThrow('Expected a string')
	})

	it('throws TypeError when called with a number', () => {
		expect(() => extractLastLink(123 as any)).toThrow(TypeError)
		expect(() => extractLastLink(123 as any)).toThrow('Expected a string')
	})
})
