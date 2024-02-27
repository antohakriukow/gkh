import { downloadCashPartnersReport } from '~/core/annual/downloadCashPartnersReport/downloadCashPartnersReport'
import { downloadCashServicesReport } from '~/core/annual/downloadCashServicesReport/downloadCashServicesReport'

import { useAnnualReport } from '../../../useAnnualReport'

export const useFinalStep = () => {
	const { annualReportInDB } = useAnnualReport()

	const downloadXLSX = () => {
		if (!annualReportInDB || !annualReportInDB.data.bankOperations) return

		if (annualReportInDB.data.settings?.structure === 'cash/partners')
			downloadCashPartnersReport(annualReportInDB)

		if (annualReportInDB.data.settings?.structure === 'cash/services')
			downloadCashServicesReport(annualReportInDB)
	}

	return { annualReportInDB, downloadXLSX }
}
