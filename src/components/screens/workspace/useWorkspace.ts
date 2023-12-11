import { useActions } from '~/hooks/useActions'
import { useData } from '~/hooks/useData'
import { useTypedSelector } from '~/hooks/useTypedSelector'

export const useWorkspace = () => {
	const { reports, isLoading } = useData()
	const { currentCompany, currentReport } = useTypedSelector(state => state.ui)
	const { setCurrentReport } = useActions()

	return {
		isLoading,
		reports,
		currentCompany,
		currentReport,
		setCurrentReport
	}
}
