import { useNavigate } from 'react-router-dom'

import { useCompaniesData } from '~/hooks/firebase-hooks/useCompaniesData'
import { useCurrentCompanyInnData } from '~/hooks/firebase-hooks/useCurrentCompanyInnData'
import { useUserData } from '~/hooks/firebase-hooks/useUserData'
import { useActions } from '~/hooks/useActions'
import { useAuth } from '~/hooks/useAuth'
import { useTypedSelector } from '~/hooks/useTypedSelector'

import { cloudFunction } from '~/services/_functions'
import { CompanyService } from '~/services/company.service'

export const useHeader = () => {
	const { logout, user } = useAuth()
	const { companies, isLoading: isCompaniesDataLoading } = useCompaniesData()
	const { currentCompanyInn, isLoading: isCurrentCompanyInnLoading } =
		useCurrentCompanyInnData()
	const { userId } = useUserData()
	const { currentCompany } = useTypedSelector(state => state.ui)
	const { setCurrentCompany, setCurrentReport } = useActions()

	const navigate = useNavigate()

	const handleLogout = () => {
		if (!user) return
		setCurrentReport(null)
		setCurrentCompany(null)
		try {
			logout()
			navigate('/')
			cloudFunction.createLog(user.uid, 'info', 'auth/logout')
		} catch (error) {
			cloudFunction.createLog(user.uid, 'error', 'auth/logout', { error })
		}
	}

	const handleSetCurrentCompany = (inn: string) => {
		if (!user) return
		CompanyService.updateCurrentCompanyInn(user.uid, inn.toString())
	}

	return {
		isCompaniesDataLoading,
		isCurrentCompanyInnLoading,
		userId,
		currentCompanyInn,
		companies,
		currentCompany,
		setCurrentCompany,
		handleSetCurrentCompany,
		handleLogout
	}
}
