import { useActions } from '~/hooks/useActions'
import { useAuth } from '~/hooks/useAuth'
import { useData } from '~/hooks/useData'
import { useTypedSelector } from '~/hooks/useTypedSelector'

export const useHeader = () => {
	const { logout } = useAuth()
	const { companies, userId, isLoading: isDataLoading } = useData()
	const { currentCompany } = useTypedSelector(state => state.ui)
	const { setCurrentCompany } = useActions()

	const handleSetCurrentCompany = async (inn: number) => {
		const current = companies.find(company => company.inn === inn)
		if (!current) return
		await setCurrentCompany(current)
	}

	return {
		isDataLoading,
		userId,
		companies,
		currentCompany,
		setCurrentCompany,
		handleSetCurrentCompany,
		logout
	}
}
