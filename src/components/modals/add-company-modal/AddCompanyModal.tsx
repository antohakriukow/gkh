import AddCompanyForm from './AddCompanyForm'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Loader } from '~/components/ui'

import { useActions } from '~/hooks/useActions'
import { useTypedSelector } from '~/hooks/useTypedSelector'

import { ICompanyInn } from '~/shared/types/company.interface'

import { DadataService } from '~/services/dadata.service'

import CompanyAdder from '../../layout/header/menu/components/CompanyAdder'

const AddCompanyModal: FC = () => {
	const [isLoading, setIsLoading] = useState(false)
	const { setNewCompany } = useActions()
	const { newCompany } = useTypedSelector(state => state.ui)

	const handleGetCompanyData = async (data: ICompanyInn) => {
		setIsLoading(true)
		const result = await DadataService.getByInn(data.inn.toString())
		setNewCompany(result)
		setIsLoading(false)
	}

	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm<ICompanyInn>({
		mode: 'onChange'
	})

	if (isLoading) return <Loader loaderType='large' />

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
