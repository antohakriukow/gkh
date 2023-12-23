import { companyData } from './company.data'
import { FC, useEffect } from 'react'
import {
	FieldError,
	FieldErrors,
	UseFormHandleSubmit,
	UseFormRegister,
	UseFormSetValue
} from 'react-hook-form'

import { Button, Field } from '~/components/ui'

import { ICompany } from '~/shared/types/company.interface'

interface IAddCompanyForm {
	register: UseFormRegister<ICompany>
	handleSubmit: UseFormHandleSubmit<ICompany, undefined>
	onSubmit: (data: ICompany) => Promise<void>
	errors: FieldErrors<ICompany>
	initialValues?: Partial<ICompany>
	setValue: UseFormSetValue<ICompany>
}

const AddCompanyDetailsForm: FC<IAddCompanyForm> = ({
	register,
	handleSubmit,
	onSubmit,
	errors,
	initialValues,
	setValue
}) => {
	useEffect(() => {
		if (initialValues) {
			Object.keys(initialValues).forEach(key => {
				setValue(key as keyof ICompany, initialValues[key as keyof ICompany])
			})
		}
	}, [initialValues, setValue])

	return (
		<div key={Field.name} style={{ padding: 24 }}>
			<h3>Внесите недостающие данные, иначе отчет будет не полным</h3>
			{companyData.map(field => (
				<Field
					{...register(field.name as keyof ICompany, {})}
					error={errors[field.name as keyof ICompany] as FieldError | undefined}
					placeholder={field.placeholder}
					type='text'
					autoComplete='off'
					step='1'
				/>
			))}
			<Button onClick={handleSubmit(onSubmit)}>Продолжить</Button>
		</div>
	)
}
export default AddCompanyDetailsForm
