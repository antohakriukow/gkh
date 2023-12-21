import { FC } from 'react'
import {
	FieldError,
	FormState,
	UseFormRegister,
	UseFormWatch
} from 'react-hook-form'

import { AuthField } from '~/components/ui'

import { validEmail } from '~/shared/regex'

interface IAuthFields {
	register: UseFormRegister<any>
	formState: FormState<any>
	watch: UseFormWatch<any>
	isPasswordRequired?: boolean
	isReg: boolean
}

const AuthFields: FC<IAuthFields> = ({
	register,
	formState: { errors },
	watch,
	isReg,
	isPasswordRequired = false
}) => {
	const isPasswordValid = watch('password')?.length >= 6

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

			{isReg && isPasswordValid && (
				<AuthField
					{...register('passwordConfirm', {
						validate: value =>
							value === watch('password') || 'Пароли не совпадают'
					})}
					placeholder='Подтвердите пароль'
					type='password'
					error={errors.passwordConfirm as FieldError}
				/>
			)}
		</>
	)
}
export default AuthFields
