import { IAddCompanyDetailsFormProps } from './add-company-modal.interface'
import { companyFieldsData } from './companyFieldsData'
import { FC, useEffect } from 'react'
import { FieldError } from 'react-hook-form'

import { Button, Field } from '~/components/ui'

import { ICompany } from '~/shared/types/company.interface'

import styles from './add-company-modal.module.scss'

const AddCompanyDetailsForm: FC<IAddCompanyDetailsFormProps> = ({
	register,
	handleSubmit,
	onSubmit,
	errors,
	initialValues,
	setValue
}) => {
	const REQUIRED_FIELD = 'Обязательное поле'
	const CONTINUE = 'Продолжить'
	const FILL_MISSING_DATA =
		'Внесите недостающие данные, иначе отчет будет не полным'

	useEffect(() => {
		if (initialValues) {
			Object.keys(initialValues).forEach(key => {
				setValue(key as keyof ICompany, initialValues[key as keyof ICompany])
			})
		}
	}, [initialValues, setValue])

	return (
		<div className={styles.formContainer}>
			<h3>{FILL_MISSING_DATA}</h3>
			<div className={styles.form} key={Field.name} style={{ padding: 24 }}>
				{companyFieldsData.map(
					field =>
						field.name !== 'phone' &&
						field.name !== 'email' && (
							<Field
								key={field.name}
								{...register(field.name as keyof ICompany, {
									required: REQUIRED_FIELD
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
			<Button onClick={handleSubmit(onSubmit)}>{CONTINUE}</Button>
		</div>
	)
}

export default AddCompanyDetailsForm
