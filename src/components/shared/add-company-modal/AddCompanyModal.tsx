import AddCompanyDetailsForm from './components/AddCompanyDetailsForm'
import AddCompanyForm from './components/AddCompanyForm'
import CompanyAdder from './components/CompanyAdder'
import { useAddCompanyModal } from './useAddCompanyModal'
import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { Loader } from '~/components/ui'

import { ICompany, ICompanyInn } from '~/shared/types/company.interface'

import { hasEmptyFields } from '~/utils/company/utils'

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
		formState: formStateInn,
		watch: watchInn
	} = useForm<ICompanyInn>({
		mode: 'onChange'
	})

	const {
		handleSubmit: handleSubmitCompany,
		register: registerCompany,
		formState: formStateCompany,
		setValue
	} = useForm<ICompany>({
		mode: 'onChange'
	})

	if (isLoading) return <Loader loaderType='small' />

	if (!!newCompany && !!hasEmptyFields(newCompany))
		return (
			<AddCompanyDetailsForm
				register={registerCompany}
				handleSubmit={handleSubmitCompany}
				onSubmit={handleSetCompanyDetails}
				errors={formStateCompany.errors}
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
			errors={formStateInn.errors}
			formState={formStateInn}
			watch={watchInn}
		/>
	)
}
export default AddCompanyModal
