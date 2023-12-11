import AddCompanyForm from './AddCompanyForm'
import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { useActions } from '~/hooks/useActions'
import { useTypedSelector } from '~/hooks/useTypedSelector'

import { ICompanyInn } from '~/shared/types/company.interface'

import { DadataService } from '~/services/dadata.external.service'

import CompanyAdder from '../../layout/header/menu/components/CompanyAdder'

const AddCompanyModal: FC = () => {
	const { setNewCompany } = useActions()
	const { newCompany } = useTypedSelector(state => state.ui)

	const handleGetCompanyData = async (data: ICompanyInn) => {
		const result = await DadataService.getByInn(data.inn.toString())
		setNewCompany(result)
	}

	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm<ICompanyInn>({
		mode: 'onChange'
	})

	if (!!newCompany) return <CompanyAdder company={newCompany} />

	return (
		<AddCompanyForm
			register={register}
			handleSubmit={handleSubmit}
			onSubmit={handleGetCompanyData}
			errors={errors}
		/>
	)
}
export default AddCompanyModal
