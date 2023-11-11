import AddBtn from './AddBtn'
import ModalContent from './ModalContent/ModalContent'
import { FC, useEffect } from 'react'

import DropDown from '~/components/screens/workspace/left-side/areas/company/drop-down/DropDown'

import { useActions } from '~/hooks/useActions'
import { useData } from '~/hooks/useData'
import { useModal } from '~/hooks/useModal'

const CompanyArea: FC = () => {
	const { companies } = useData()
	const { setCurrentCompany } = useActions()
	const { showModal } = useModal()

	const handleAdd = () => showModal(<ModalContent />)

	useEffect(() => {
		companies.length ? setCurrentCompany(companies[0]) : setCurrentCompany(null)
	})

	if (!companies || companies.length === 0)
		return <AddBtn onClick={handleAdd} />

	return <DropDown data={companies} onClick={handleAdd} />
}
export default CompanyArea
