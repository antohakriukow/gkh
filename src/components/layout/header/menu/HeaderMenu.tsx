import LogoutButton from './components/buttons/LogoutButton'
import { FC, useEffect } from 'react'

import DropDown from '~/components/layout/header/menu/components/drop-down/DropDown'

import { useHeader } from '../useHeader'

const HeaderMenu: FC = () => {
	const { currentCompanyInn, companies, currentCompany, setCurrentCompany } =
		useHeader()

	useEffect(() => {
		if (!!currentCompany && !currentCompanyInn) return

		companies.length
			? setCurrentCompany(
					companies.find(
						company => company.inn.toString() === currentCompanyInn.toString()
					) || null
			  )
			: setCurrentCompany(null)
	})

	return (
		<>
			{!companies || companies.length === 0 ? (
				<LogoutButton />
			) : (
				<DropDown data={companies} />
			)}
		</>
	)
}
export default HeaderMenu
