import { getAnnualReportStructureName } from '../utils'

describe('getAnnualReportStructureName', () => {
	it('returns correct structure name for defined types', () => {
		expect(getAnnualReportStructureName('accruals/services')).toEqual(
			'Метод начислений'
		)
		expect(getAnnualReportStructureName('cash/partners')).toEqual(
			'Кассовый метод'
		)
		expect(getAnnualReportStructureName('cash/services')).toEqual('Смешанный')
	})

	it('returns "Не выбран" for undefined or unknown types', () => {
		expect(getAnnualReportStructureName(undefined)).toEqual('Не выбран')
		expect(getAnnualReportStructureName('unknown')).toEqual('Не выбран')
	})
})
