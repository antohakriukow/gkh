import { camelCaseToKebabCase } from '../utils'

describe('camelCaseToKebabCase', () => {
	it('with camelCase values -> returns kebab-case', () => {
		expect(camelCaseToKebabCase('formatVersion')).toEqual('format-version')
		expect(camelCaseToKebabCase('')).toEqual('')
		expect(camelCaseToKebabCase('a')).toEqual('a')
		expect(camelCaseToKebabCase('a-b-c')).toEqual('a-b-c')
		expect(camelCaseToKebabCase('a0bC')).toEqual('a0b-c')
	})
})
