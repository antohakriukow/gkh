import AddCompanyDetailsForm from './AddCompanyDetailsForm'
import AddCompanyForm from './AddCompanyForm'
import { useAddCompanyModal } from './useAddCompanyModal'
import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { Loader } from '~/components/ui'

import { ICompany, ICompanyInn } from '~/shared/types/company.interface'

import { hasEmptyFields } from '~/utils/company.utils'

import CompanyAdder from '../../layout/header/menu/components/CompanyAdder'

const AddCompanyModal: FC = () => {
	const {
		isLoading,
		newCompany,
		handleGetCompanyData,
		handleSetCompanyDetails
	} = useAddCompanyModal()

	const {
		handleSubmit: handleSubmitCompanyInn,
		register: registerCompanyInn,
		formState: { errors: errorsCompanyInn }
	} = useForm<ICompanyInn>({
		mode: 'onChange'
	})

	const {
		handleSubmit: handleSubmitCompany,
		register: registerCompany,
		formState: { errors: errorsCompany },
		setValue
	} = useForm<ICompany>({
		mode: 'onChange'
	})

	if (isLoading) return <Loader loaderType='large' />

	if (!!newCompany && !!hasEmptyFields(newCompany))
		return (
			<AddCompanyDetailsForm
				register={registerCompany}
				handleSubmit={handleSubmitCompany}
				onSubmit={handleSetCompanyDetails}
				errors={errorsCompany}
				setValue={setValue}
				initialValues={newCompany}
			/>
		)

	if (!!newCompany) return <CompanyAdder company={newCompany} />

	return (
		<AddCompanyForm
			register={registerCompanyInn}
			handleSubmit={handleSubmitCompanyInn}
			onSubmit={handleGetCompanyData}
			errors={errorsCompanyInn}
		/>
	)
}
export default AddCompanyModal
