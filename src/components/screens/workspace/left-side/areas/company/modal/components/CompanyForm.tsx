import { FC } from 'react'
import {
	FieldErrors,
	UseFormHandleSubmit,
	UseFormRegister
} from 'react-hook-form'

import { Button, Field } from '~/components/ui'

import { ICompanyInn } from '~/shared/types/company.interface'

import styles from '../CompanyModal.module.scss'

interface ICompanyForm {
	register: UseFormRegister<ICompanyInn>
	handleSubmit: UseFormHandleSubmit<ICompanyInn, undefined>
	onSubmit: (data: ICompanyInn) => Promise<void>
	errors: FieldErrors<ICompanyInn>
}

const CompanyForm: FC<ICompanyForm> = ({
	register,
	handleSubmit,
	onSubmit,
	errors
}) => {
	return (
		<div className={styles.companyForm}>
			<Field
				{...register('inn', {
					minLength: {
						value: 10,
						message: 'Длина ИНН должна быть равна 10 цифрам'
					},
					maxLength: {
						value: 10,
						message: 'Длина ИНН должна быть равна 10 цифрам'
					}
				})}
				error={errors.inn}
				placeholder='Введите ИНН'
				type='number'
				autoComplete='off'
				step='1'
			/>
			<Button onClick={handleSubmit(data => onSubmit(data))}>
				НАЙТИ ПО ИНН
			</Button>
		</div>
	)
}
export default CompanyForm
