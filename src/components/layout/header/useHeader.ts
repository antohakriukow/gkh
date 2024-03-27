import { useLocation, useNavigate } from 'react-router-dom'

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
	const location = useLocation()

	const navigate = useNavigate()

	const handleGoToHomePage = () => navigate('/')

	const handleRedirect = () => {
		if (location.pathname.includes('/reports/edit')) navigate('/reports')
		if (location.pathname.includes('/annual-reports/edit'))
			navigate('/annual-reports')
	}

	const handleLogout = () => {
		if (!user) return
		setCurrentReport(null)
		setCurrentCompany(null)
		try {
			logout()
			handleGoToHomePage()
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
		isLoading: isCompaniesDataLoading && isCurrentCompanyInnLoading,
		userId,
		currentCompanyInn,
		companies,
		currentCompany,
		setCurrentCompany,
		handleSetCurrentCompany,
		handleLogout,
		handleRedirect
	}
}
