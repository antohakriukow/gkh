import { useNavigate, useParams } from 'react-router-dom'
import { downloadCashPartnersReport } from '~/core/annual/downloadCashPartnersReport/downloadCashPartnersReport'
import { downloadCashServicesReport } from '~/core/annual/downloadCashServicesReport/downloadCashServicesReport'
import { AnnualReportPrice } from '~/payment/_prices'
import createPaymentButtonData from '~/payment/createPaymentData'
import { annualReceipt } from '~/payment/receipts/annualReceipt'

import { usePaymentsData } from '~/hooks/firebase-hooks/usePaymentsData'
import { useSingleAnnualReportData } from '~/hooks/firebase-hooks/useSingleAnnualReportData'
import { useUserData } from '~/hooks/firebase-hooks/useUserData'
import { useAuth } from '~/hooks/useAuth'

import { AnnualService } from '~/services/annual.service'

export const useAnnualReport = () => {
	const { user, isLoading: isAuthLoading } = useAuth()
	const { userId, isLoading: isUserIdLoading } = useUserData()
	const { payments, isLoading: isPaymentsLoading } = usePaymentsData()
	const { reportId } = useParams<{ reportId: string }>()
	const navigate = useNavigate()
	const { annualReport, isLoading: isAnnualReportLoading } =
		useSingleAnnualReportData(reportId ?? '')

	const isDataLoading =
		isAuthLoading &&
		isUserIdLoading &&
		isPaymentsLoading &&
		isAnnualReportLoading

	const annualReportInDB = annualReport ?? {}

	const redirectToDataUploader = () =>
		navigate(`/annual-reports/edit/${reportId}/data-uploader`)
	const redirectToCategoriesSetter = () =>
		navigate(`/annual-reports/edit/${reportId}/categories-setter`)
	const redirectToAccrualsSetter = () =>
		navigate(`/annual-reports/edit/${reportId}/accruals-setter`)
	const redirectToCreditSorter = () =>
		navigate(`/annual-reports/edit/${reportId}/credit-sorter`)
	const redirectToDebitSorter = () =>
		navigate(`/annual-reports/edit/${reportId}/debit-sorter`)
	const redirectToPreview = () =>
		navigate(`/annual-reports/edit/${reportId}/preview`)

	const closeAnnualReport = () => navigate(`/annual-reports`)

	const deleteAnnualReport = async () => {
		if (!user || !reportId) return

		try {
			await AnnualService.remove(user?.uid, reportId)
			closeAnnualReport()
		} catch (error) {
			console.log('error: ', error)
		}
	}

	const paymentButtonData = createPaymentButtonData({
		cost: AnnualReportPrice,
		invoiceId: payments.length + 1,
		description: 'Плата за генерацию отчета в сервисе 22gkh.ru',
		receipt: annualReceipt,
		isTest: 0,
		userId: user ? user.uid : '',
		shortId: userId,
		type: 'annual',
		instanceId: annualReportInDB ? String(annualReportInDB._id) : ''
	})

	const downloadXLSX = () => {
		if (!annualReportInDB || !annualReportInDB.data.bankOperations) return

		if (annualReportInDB.data.settings?.structure === 'cash/partners')
			downloadCashPartnersReport(annualReportInDB)

		if (annualReportInDB.data.settings?.structure === 'cash/services')
			downloadCashServicesReport(annualReportInDB)
	}

	const isReportPayed = payments.some(
		payment =>
			payment.type === 'annual' &&
			payment.instanceId === String(annualReportInDB?._id)
	)

	return {
		isDataLoading,
		annualReportInDB,
		isReportPayed,
		closeAnnualReport,
		deleteAnnualReport,
		redirectToDataUploader,
		redirectToCategoriesSetter,
		redirectToAccrualsSetter,
		redirectToCreditSorter,
		redirectToDebitSorter,
		redirectToPreview,
		paymentButtonData,
		downloadXLSX
	}
}
