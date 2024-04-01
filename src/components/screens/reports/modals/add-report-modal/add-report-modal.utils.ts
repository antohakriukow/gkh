import { clear22gkhReportData } from '~/data/clear22gkhReportData'

import { IReport22gkhData } from '~/shared/types/report22gkh.interface'
import { IReport } from '~/shared/types/report.interface'

export const getReportInitialData = (previousReport?: IReport) => {
	if (!previousReport) return { accruals: clear22gkhReportData }

	let previousReportData = {
		area: previousReport.data.area,
		elevator: previousReport.data.elevator,
		gasBoiler: previousReport.data.gasBoiler,
		renovation: previousReport.data.renovation,
		settings: previousReport.data.settings,
		stove: previousReport.data.stove,
		waterHeating: previousReport.data.waterHeating,
		budgetFinancing: previousReport.data.budgetFinancing,
		renovationCosts: previousReport.data.renovationCosts,
		accruals: clear22gkhReportData,
		vat: { status: previousReport?.data?.vat?.status ?? 'no' }
	} as IReport22gkhData

	if (previousReport.period !== 4)
		previousReportData.residentsDebts = previousReport.data.residentsDebts

	return previousReportData
}
