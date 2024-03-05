import { useNavigate, useParams } from 'react-router-dom'

import { useAuth } from '~/hooks/useAuth'
import { useData } from '~/hooks/useData'

export const useAnnualReport = () => {
	const { user } = useAuth()
	const { annuals, payments, userId } = useData()
	const { reportId } = useParams<{ reportId: string }>()
	const navigate = useNavigate()

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

	const annualReportInDB = reportId
		? annuals.find(
				annualReport => annualReport._id.toString() === reportId.toString()
		  )
		: null

	return {
		annualReportInDB,
		redirectToDataUploader,
		redirectToCategoriesSetter,
		redirectToAccrualsSetter,
		redirectToCreditSorter,
		redirectToDebitSorter,
		redirectToPreview
	}
}
