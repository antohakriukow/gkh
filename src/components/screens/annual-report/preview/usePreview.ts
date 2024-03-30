import { useNavigate } from 'react-router-dom'
import { downloadCashPartnersReport } from '~/core/annual/downloadCashPartnersReport/downloadCashPartnersReport'
import { downloadCashServicesReport } from '~/core/annual/downloadCashServicesReport/downloadCashServicesReport'

import { useWindowWidth } from '~/hooks/useWindowWidth'

import { useAnnualReport } from '../useAnnualReport'

export const usePreview = () => {
	const navigate = useNavigate()
	const {
		isDataLoading,
		annualReportInDB,
		isReportPayed,
		closeAnnualReport,
		deleteAnnualReport,
		paymentButtonData
	} = useAnnualReport()

	const { width } = useWindowWidth()
	const isNarrow = width < 500

	const isCashPartnersStructure =
		annualReportInDB?.data?.settings?.structure === 'cash/partners'

	const downloadXLSX = () => {
		if (!annualReportInDB || !annualReportInDB.data.bankOperations) return

		if (annualReportInDB.data.settings?.structure === 'cash/partners')
			downloadCashPartnersReport(annualReportInDB)

		if (annualReportInDB.data.settings?.structure === 'cash/services')
			downloadCashServicesReport(annualReportInDB)
	}

	const redirectToCategoriesSetter = () =>
		navigate(`/annual-reports/edit/${annualReportInDB?._id}/debit-sorter`)

	const handleNext = () =>
		isReportPayed ? downloadXLSX() : paymentButtonData.onClick()

	return {
		isDataLoading,
		isCashPartnersStructure,
		isNarrow,
		isReportPayed,
		annualReportInDB,
		paymentButtonData,
		closeAnnualReport,
		deleteAnnualReport,
		redirectToCategoriesSetter,
		handleNext
	}
}
