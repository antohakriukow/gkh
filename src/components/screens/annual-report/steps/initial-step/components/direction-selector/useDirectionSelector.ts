import { useActions } from '~/hooks/useActions'
import { useTypedSelector } from '~/hooks/useTypedSelector'

import { IAccount } from '~/shared/types/annual.interface'

export const useDirectionSelector = () => {
	const state = useTypedSelector(state => state.annual)
	const { setAnnualAccounts } = useActions()

	const setAccountDirection = (account: IAccount) => {
		const updatedAccounts = state.accounts.map(acc =>
			acc.number === account.number ? { ...acc, type: account.type } : acc
		)

		setAnnualAccounts(updatedAccounts)
	}

	return { state, setAccountDirection }
}
