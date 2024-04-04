import { convertXmlAttributes } from '../utils'

describe('convertXmlAttributes', () => {
	it('with normal values -> converts attributes to kebab-case', () => {
		const xmlStr =
			'<element someAttribute="value" anotherAttribute="anotherValue"/>'
		const expected =
			'<element some-attribute="value" another-attribute="anotherValue"/>'
		expect(convertXmlAttributes(xmlStr)).toEqual(expected)
	})

	it('with no attributes -> returns original string', () => {
		const xmlStr = '<element/>'
		expect(convertXmlAttributes(xmlStr)).toEqual(xmlStr)
	})

	it('with nested elements -> converts all attributes to kebab-case', () => {
		const xmlStr =
			'<root><element someAttribute="value"/><element anotherAttribute="anotherValue"/></root>'
		const expected =
			'<root><element some-attribute="value"/><element another-attribute="anotherValue"/></root>'
		expect(convertXmlAttributes(xmlStr)).toEqual(expected)
	})
})
