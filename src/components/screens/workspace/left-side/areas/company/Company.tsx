import AddCompanyBtn from './AddCompanyBtn'
import CompanyModal from './modal/CompanyModal'
import { useCompany } from './useCompany'
import { FC, useEffect } from 'react'

import DropDown from '~/components/screens/workspace/left-side/areas/company/drop-down/DropDown'

import { useModal } from '~/hooks/useModal'

const CompanyArea: FC = () => {
	const { companies, currentCompany, setCurrentCompany } = useCompany()
	const { showModal } = useModal()

	const handleAdd = () => showModal(<CompanyModal />)

	useEffect(() => {
		if (!!currentCompany) return
		companies.length ? setCurrentCompany(companies[0]) : setCurrentCompany(null)
	})

	return (
		<>
			{!companies || companies.length === 0 ? (
				<AddCompanyBtn onClick={handleAdd} />
			) : (
				<DropDown data={companies} onClick={handleAdd} />
			)}
		</>
	)
}
export default CompanyArea
