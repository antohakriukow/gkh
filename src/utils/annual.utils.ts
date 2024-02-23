import { TypeAnnualReportStructure } from '~/shared/types/annual.interface'

export const getAnnualReportStructureName = (
	name: TypeAnnualReportStructure | undefined
) => {
	switch (name) {
		case 'accruals/services':
			return 'Метод начислений'
		case 'cash/partners':
			return 'Кассовый метод'
		case 'cash/services':
			return 'Смешанный'
		default:
			return 'Не выбран'
	}
}
