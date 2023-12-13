import AddCompanyBtn from './components/buttons/AddCompanyButton'
import { FC, useEffect } from 'react'

import DropDown from '~/components/layout/header/menu/components/drop-down/DropDown'

import { useHeader } from '../useHeader'

const HeaderMenu: FC = () => {
	const { companies, currentCompany, setCurrentCompany } = useHeader()

	useEffect(() => {
		if (!!currentCompany) return
		companies.length ? setCurrentCompany(companies[0]) : setCurrentCompany(null)
	})

	return (
		<>
			{!companies || companies.length === 0 ? (
				<AddCompanyBtn />
			) : (
				<DropDown data={companies} />
			)}
		</>
	)
}
export default HeaderMenu