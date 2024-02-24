import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useActions } from '~/hooks/useActions'
import { useAuth } from '~/hooks/useAuth'
import { useData } from '~/hooks/useData'
import { useTypedSelector } from '~/hooks/useTypedSelector'

import { AnnualService } from '~/services/annual.service'

export const useAnnualReport = () => {
	const { user } = useAuth()
	const [isLoading, setIsLoading] = useState(true)
	const { annuals } = useData()
	const { reportId } = useParams<{ reportId: string }>()
	const { currentAnnualReport, annualReportInitialDataSavedToDb } =
		useTypedSelector(state => state.ui)
	const { setCurrentAnnualReport } = useActions()
	const navigate = useNavigate()

	const annualReportInDB = reportId
		? annuals.find(
				annualReport => annualReport._id.toString() === reportId.toString()
		  )
		: null

	useEffect(() => {
		if (currentAnnualReport?._id !== reportId && annualReportInDB) {
			setCurrentAnnualReport(annualReportInDB)
			setIsLoading(false)
		}
	}, [
		annualReportInDB,
		reportId,
		annuals,
		currentAnnualReport,
		setCurrentAnnualReport
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

	return {
		annualReportInDB,
		finalFunction,
		finalButtonTitle,
		currentAnnualReport,
		annualReportInitialDataSavedToDb,
		isLoading,
		closeAnnualReport,
		deleteAnnualReport
	}
}
