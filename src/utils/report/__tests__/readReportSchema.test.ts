import { readReportSchema } from '../utils'

describe('readReportSchema', () => {
	it('reads the report schema and returns a structured array of data', () => {
		const schema = {
			'01': { col1: 100, col2: 0 },
			'02': { col1: undefined, col2: null, col3: 200 }
		}
		const result = readReportSchema(schema)
		expect(result).toEqual([
			{
				_name: 'row',
				_attrs: { code: '01' },
				_content: [{ _name: 'col', _attrs: { code: 'col1' }, _content: 100 }]
			},
			{
				_name: 'row',
				_attrs: { code: '02' },
				_content: [{ _name: 'col', _attrs: { code: 'col3' }, _content: 200 }]
			}
		])
	})

	it('returns undefined if schema is not provided', () => {
		expect(readReportSchema()).toBeUndefined()
	})
})
