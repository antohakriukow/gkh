import { useActions } from '~/hooks/useActions'
import { useAuth } from '~/hooks/useAuth'
import { useData } from '~/hooks/useData'
import { useModal } from '~/hooks/useModal'
import { useTypedSelector } from '~/hooks/useTypedSelector'

import { IReportCreate } from '~/shared/types/report.interface'

import { ReportService } from '~/services/report.service'

export const useReport = () => {
	const { user } = useAuth()
	const { hideModal } = useModal()
	const { companies, reports, isLoading } = useData()

	const { currentCompany, newReportYear, newReportPeriod } = useTypedSelector(
		state => state.ui
	)
	const { setNewReportYear, setNewReportPeriod } = useActions()

	const create = async (data: IReportCreate) => {
		// setIsLoading(true)
		try {
			if (user) ReportService.create(user.uid, data)
		} catch (error) {
			console.log(error)
		} finally {
			hideModal()
			// setIsLoading(false)
		}
	}

	return {
		companies,
		reports,
		isLoading,
		create,
		currentCompany,
		newReportYear,
		newReportPeriod,
		setNewReportYear,
		setNewReportPeriod
	}
}
