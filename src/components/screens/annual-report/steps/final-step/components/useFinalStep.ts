import { downloadCashPartnersReport } from '~/core/annual/downloadCashPartnersReport/downloadCashPartnersReport'

import { useAnnualReport } from '../../../useAnnualReport'

export const useFinalStep = () => {
	const { annualReportInDB } = useAnnualReport()

	const downloadXLSX = () =>
		!!annualReportInDB &&
		!!annualReportInDB.data.bankOperations &&
		downloadCashPartnersReport(annualReportInDB)

	return { annualReportInDB, downloadXLSX }
}
