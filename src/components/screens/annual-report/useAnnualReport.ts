import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useActions } from '~/hooks/useActions'
import { useData } from '~/hooks/useData'
import { useTypedSelector } from '~/hooks/useTypedSelector'

export const useAnnualReport = () => {
	const { annuals } = useData()
	const { reportId } = useParams<{ reportId: string }>()
	const { currentAnnualReport, annualReportInitialDataSavedToDb } =
		useTypedSelector(state => state.ui)
	const { setCurrentAnnualReport } = useActions()

	useEffect(() => {
		const reportFromUrl = reportId
			? annuals.find(
					annualReport => annualReport._id.toString() === reportId.toString()
			  )
			: null

		if (currentAnnualReport?._id !== reportId && reportFromUrl) {
			setCurrentAnnualReport(reportFromUrl)
		}
	}, [reportId, annuals, currentAnnualReport, setCurrentAnnualReport])

	const finalFunction = () => console.log('finalFunction')
	const finalButtonTitle = 'Предпросмотр'

	return {
		finalFunction,
		finalButtonTitle,
		currentAnnualReport,
		annualReportInitialDataSavedToDb
	}
}
