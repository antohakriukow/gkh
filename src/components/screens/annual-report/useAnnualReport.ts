import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AnnualReportPrice } from '~/payment/_prices'
import createPaymentButtonData from '~/payment/createPaymentData'
import { annualReceipt } from '~/payment/receipts/annualReceipt'

import { useActions } from '~/hooks/useActions'
import { useAuth } from '~/hooks/useAuth'
import { useData } from '~/hooks/useData'
import { useTypedSelector } from '~/hooks/useTypedSelector'

import { AnnualService } from '~/services/annual.service'

export const useAnnualReport = () => {
	const { user } = useAuth()
	const { annuals, payments, userId } = useData()
	const { reportId } = useParams<{ reportId: string }>()
	const { isLoading, currentAnnualReport, annualReportInitialDataSavedToDb } =
		useTypedSelector(state => state.ui)
	const { setCurrentAnnualReport, setIsLoading } = useActions()
	const navigate = useNavigate()

	const annualReportInDB = reportId
		? annuals.find(
				annualReport => annualReport._id.toString() === reportId.toString()
		  )
		: null

	const [lastBankOperationId, setLastBankOperationId] = useState(
		Number(annualReportInDB?.data?.bankOperations?.length) - 1
	)

	useEffect(() => {
		const operationsLength = annualReportInDB?.data?.bankOperations?.length ?? 0
		setLastBankOperationId(operationsLength - 1)
	}, [annualReportInDB?.data?.bankOperations])

	useEffect(() => {
		if (!currentAnnualReport?._id) setIsLoading(true)
		if (currentAnnualReport?._id !== reportId && annualReportInDB) {
			setCurrentAnnualReport(annualReportInDB)
			setIsLoading(false)
		}
	}, [
		annualReportInDB,
		reportId,
		annuals,
		currentAnnualReport,
		setCurrentAnnualReport,
		setIsLoading
	])

	const closeAnnualReport = () => navigate(`/annual-reports`)

	const deleteAnnualReport = () => {
		if (!user || !reportId) return

		try {
			AnnualService.remove(user?.uid, reportId)
			closeAnnualReport()
		} catch (error) {
			console.log('error: ', error)
		}
	}

	const finalFunction = () => console.log('finalFunction')
	const finalButtonTitle = 'Предпросмотр'

	const annualReportInDBId = annualReportInDB?._id.toString()

	const paymentButtonData = createPaymentButtonData({
		cost: AnnualReportPrice,
		invoiceId: payments.length + 1,
		description: 'Плата за генерацию отчета на 22gkh.ru',
		receipt: annualReceipt,
		isTest: 0,
		userId: user ? user.uid : '',
		shortId: userId,
		type: 'annual',
		instanceId: annualReportInDB ? annualReportInDB._id.toString() : ''
	})

	const isReportPayed = payments.some(
		payment =>
			payment.type === 'annual' &&
			payment.instanceId === annualReportInDB?._id.toString()
	)

	// const isReportPayed = true

	return {
		annualReportInDB,
		annualReportInDBId,
		finalFunction,
		finalButtonTitle,
		currentAnnualReport,
		annualReportInitialDataSavedToDb,
		isLoading,
		closeAnnualReport,
		deleteAnnualReport,
		lastBankOperationId,

		paymentButtonData,
		isReportPayed
	}
}
