import { FC } from 'react'

import AddCompanyModal from '~/components/screens/reports/modals/add-company-modal/AddCompanyModal'
import { Button } from '~/components/ui'

import { useData } from '~/hooks/useData'
import { useModal } from '~/hooks/useModal'

const AddReportBtn: FC<{ onClick: () => void }> = ({ onClick }) => {
	const { companies } = useData()
	const { showModal } = useModal()

	const handleAddCompany = () => showModal(<AddCompanyModal />)

	return (
		<Button
			style={{ marginTop: 16 }}
			onClick={companies.length > 0 ? onClick : handleAddCompany}
		>
			{companies.length > 0 ? 'Создать отчет' : 'Добавить компанию'}
		</Button>
	)
}
export default AddReportBtn
