import { convertLineBreaksToHTML } from '../utils'

describe('convertLineBreaksToHTML', () => {
	it('with line breaks -> returns string with <br/> tags', () => {
		const text = 'line1\nline2\nline3'
		const expected = 'line1<br/>line2<br/>line3'
		expect(convertLineBreaksToHTML(text)).toEqual(expected)
	})

	it('without line breaks -> returns original string', () => {
		const text = 'line1 line2 line3'
		expect(convertLineBreaksToHTML(text)).toEqual(text)
	})

	it('with multiple consecutive line breaks -> returns correctly formatted string', () => {
		const text = 'line1\n\nline2\n\n\nline3'
		const expected = 'line1<br/><br/>line2<br/><br/><br/>line3'
		expect(convertLineBreaksToHTML(text)).toEqual(expected)
	})
})
