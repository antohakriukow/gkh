import { replaceAmountWithFakeIfFalse } from '../utils'

describe('replaceAmountWithFakeIfFalse', () => {
	it('with (undefined, true) -> returns empty string', () => {
		const result = replaceAmountWithFakeIfFalse(undefined, true)
		expect(result).toBe('')
	})

	it('with (undefined, false) -> returns empty string', () => {
		const result = replaceAmountWithFakeIfFalse(undefined, false)
		expect(result).toBe('')
	})

	it('with (empty string, true) -> returns empty string', () => {
		const result = replaceAmountWithFakeIfFalse(undefined, true)
		expect(result).toBe('')
	})

	it('with (empty string, false) -> returns empty string', () => {
		const result = replaceAmountWithFakeIfFalse('', false)
		expect(result).toBe('')
	})

	it('with ("100", false) -> returns empty string', () => {
		const result = replaceAmountWithFakeIfFalse('100', false)
		expect(result).toBe('000')
	})

	it('with ("100,00", false) -> returns empty string', () => {
		const result = replaceAmountWithFakeIfFalse('100,00', false)
		expect(result).toBe('000,00')
	})

	it('with ("SOME STRING", false) -> returns empty string', () => {
		const result = replaceAmountWithFakeIfFalse('SOME STRING', false)
		expect(result).toBe('SOME STRING')
	})
})
