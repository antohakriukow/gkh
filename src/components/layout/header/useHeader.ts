import { useActions } from '~/hooks/useActions'
import { useAuth } from '~/hooks/useAuth'
import { useData } from '~/hooks/useData'
import { useTypedSelector } from '~/hooks/useTypedSelector'

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
	const { setCurrentCompany } = useActions()

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
		logout
	}
}
