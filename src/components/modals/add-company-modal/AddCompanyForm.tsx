import { FC } from 'react'
import {
	FieldErrors,
	UseFormHandleSubmit,
	UseFormRegister
} from 'react-hook-form'

import { Button, Field } from '~/components/ui'

import { ICompanyInn } from '~/shared/types/company.interface'

interface IAddCompanyForm {
	register: UseFormRegister<ICompanyInn>
	handleSubmit: UseFormHandleSubmit<ICompanyInn, undefined>
	onSubmit: (data: ICompanyInn) => Promise<void>
	errors: FieldErrors<ICompanyInn>
}

const AddCompanyForm: FC<IAddCompanyForm> = ({
	register,
	handleSubmit,
	onSubmit,
	errors
}) => {
	return (
		<div style={{ padding: 24 }}>
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
			<Button onClick={handleSubmit(data => onSubmit(data))}>
				НАЙТИ ПО ИНН
			</Button>
		</div>
	)
}
export default AddCompanyForm
