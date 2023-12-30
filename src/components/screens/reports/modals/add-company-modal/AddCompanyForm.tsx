import { FC } from 'react'
import {
	FieldErrors,
	FormState,
	UseFormHandleSubmit,
	UseFormRegister,
	UseFormWatch
} from 'react-hook-form'

import { Button, Field } from '~/components/ui'

import { ICompanyInn } from '~/shared/types/company.interface'

import styles from './CompanyModal.module.scss'

interface IAddCompanyForm {
	register: UseFormRegister<ICompanyInn>
	handleSubmit: UseFormHandleSubmit<ICompanyInn, undefined>
	onSubmit: (data: ICompanyInn) => Promise<void>
	formState: FormState<ICompanyInn>
	watch: UseFormWatch<ICompanyInn>
	errors: FieldErrors<ICompanyInn>
}

const AddCompanyForm: FC<IAddCompanyForm> = ({
	register,
	handleSubmit,
	onSubmit,
	formState,
	watch,
	errors
}) => {
	const { isValid } = formState
	const isEmpty = !watch('inn')

	return (
		<div className={styles.formContainer}>
			<Field
				{...register('inn', {
					minLength: {
						value: 10,
						message: 'Невалидный ИНН'
					},
					maxLength: {
						value: 10,
						message: 'Невалидный ИНН'
					}
				})}
				error={errors.inn}
				placeholder='Введите ИНН'
				type='number'
				autoComplete='off'
				step='1'
			/>
			<Button
				disabled={!isValid || isEmpty}
				onClick={handleSubmit(data => onSubmit(data))}
			>
				Найти
			</Button>
		</div>
	)
}
export default AddCompanyForm
