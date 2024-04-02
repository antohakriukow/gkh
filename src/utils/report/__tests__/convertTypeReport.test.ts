import { convertTypeReport } from '../utils'

describe('convertTypeReport', () => {
	it('converts report type "22gkh" to its full name', () => {
		expect(convertTypeReport('22gkh')).toEqual('22-ЖКХ (Жилище)')
	})

	it('converts other report types to "Отчет об исполнении сметы"', () => {
		expect(convertTypeReport('annual')).toEqual('Отчет об исполнении сметы')
	})
})
