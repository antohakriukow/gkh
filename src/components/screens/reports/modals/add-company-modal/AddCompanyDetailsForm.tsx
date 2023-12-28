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

import styles from './CompanyModal.module.scss'

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
		<div className={styles.formContainer}>
			<h3>Внесите недостающие данные, иначе отчет будет не полным</h3>
			<div className={styles.form} key={Field.name} style={{ padding: 24 }}>
				{companyData.map(
					field =>
						field.name !== 'phone' &&
						field.name !== 'email' && (
							<Field
								key={field.name}
								{...register(field.name as keyof ICompany, {
									required: 'Обязательное поле'
								})}
								error={errors[field.name as keyof ICompany] as FieldError}
								disabled={
									!!initialValues &&
									initialValues[field.name as keyof ICompany] !== ''
								}
								placeholder={field.placeholder}
								type='text'
								autoComplete='off'
								step='1'
							/>
						)
				)}
			</div>
			<Button onClick={handleSubmit(onSubmit)}>Продолжить</Button>
		</div>
	)
}

export default AddCompanyDetailsForm
