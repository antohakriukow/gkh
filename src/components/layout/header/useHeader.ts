import { useActions } from '~/hooks/useActions'
import { useAuth } from '~/hooks/useAuth'
import { useData } from '~/hooks/useData'
import { useTypedSelector } from '~/hooks/useTypedSelector'

import { cloudFunction } from '~/services/_functions'
import { CompanyService } from '~/services/company.service'

export const useHeader = () => {
	const { logout } = useAuth()
	const {
		companies,
		userId,
		userUid,
		currentCompanyInn,
		isLoading: isDataLoading
	} = useData()
	const { currentCompany } = useTypedSelector(state => state.ui)
	const { setCurrentCompany, setCurrentReport } = useActions()

	const handleLogout = () => {
		setCurrentReport(null)
		setCurrentCompany(null)
		try {
			logout()
			cloudFunction.createLog(userUid, 'info', 'auth/logout')
		} catch (error) {
			cloudFunction.createLog(userUid, 'error', 'auth/logout', { error })
		}
	}

	const handleSetCurrentCompany = (inn: number) =>
		CompanyService.updateCurrentCompanyInn(userUid, inn.toString())

	return {
		isDataLoading,
		userId,
		currentCompanyInn,
		companies,
		currentCompany,
		setCurrentCompany,
		handleSetCurrentCompany,
		handleLogout
	}
}
