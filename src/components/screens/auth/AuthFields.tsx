import { FC } from 'react'
import { FieldError, FormState, UseFormRegister } from 'react-hook-form'

import { AuthField } from '~/components/ui'

import { validEmail } from '~/shared/regex'

interface IAuthFields {
	register: UseFormRegister<any>
	formState: FormState<any>
	isPasswordRequired?: boolean
}

const AuthFields: FC<IAuthFields> = ({
	register,
	formState: { errors },
	isPasswordRequired = false
}) => {
	return (
		<>
			<AuthField
				{...register('email', {
					required: 'Это обязательное поле',
					pattern: {
						value: validEmail,
						message: 'Введите валидный email'
					}
				})}
				placeholder='E-mail'
				error={errors.email as FieldError}
			/>

			<AuthField
				{...register(
					'password',
					isPasswordRequired
						? {
								required: 'Это обязательное поле',
								minLength: {
									value: 6,
									message: 'Минимальная длина пароля 6 символов'
								}
						  }
						: {}
				)}
				placeholder='Пароль'
				type='password'
				error={errors.password as FieldError}
			/>
		</>
	)
}
export default AuthFields
