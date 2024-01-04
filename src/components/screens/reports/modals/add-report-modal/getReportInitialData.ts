import { clear22gkhReportData } from '~/data/clear22gkhReportData'

import { IReport } from '~/shared/types/report.interface'

export const getReportInitialData = (report?: IReport) => {
	if (!report) return { accruals: clear22gkhReportData }
	return {
		area: report.data.area,
		elevator: report.data.elevator,
		gasBoiler: report.data.gasBoiler,
		renovation: report.data.renovation,
		settings: report.data.settings,
		stove: report.data.stove,
		waterHeating: report.data.waterHeating,
		budgetFinancing: report.data.budgetFinancing,
		renovationCosts: report.data.renovationCosts,
		accruals: clear22gkhReportData
	}
}
