import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useActions } from '~/hooks/useActions'
import { useData } from '~/hooks/useData'
import { useTypedSelector } from '~/hooks/useTypedSelector'

export const useAnnualReport = () => {
	const [isLoading, setIsLoading] = useState(true)
	const { annuals } = useData()
	const { reportId } = useParams<{ reportId: string }>()
	const { currentAnnualReport, annualReportInitialDataSavedToDb } =
		useTypedSelector(state => state.ui)
	const { setCurrentAnnualReport } = useActions()

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

	const finalFunction = () => console.log('finalFunction')
	const finalButtonTitle = 'Предпросмотр'

	return {
		annualReportInDB,
		finalFunction,
		finalButtonTitle,
		currentAnnualReport,
		annualReportInitialDataSavedToDb,
		isLoading
	}
}
