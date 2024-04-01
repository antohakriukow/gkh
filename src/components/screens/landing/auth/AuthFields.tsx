import Checkbox from './components/Checkbox/Checkbox'
import { FC } from 'react'
import {
	FieldError,
	FormState,
	UseFormRegister,
	UseFormWatch
} from 'react-hook-form'
import { personalDataPolicy } from '~/data/law-docs/personal-data-policy'
import { saasContract } from '~/data/law-docs/saas-contract'
import { usePDF } from '~/hooks'

import { AuthField } from '~/components/ui'

import { validEmail } from '~/shared/regex'

import styles from './Auth.module.scss'

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
	const { printSimplePDF } = usePDF()
	const isPasswordValid = watch('password')?.length >= 6

	const handlePrintContract = () => printSimplePDF(saasContract)
	const handlePrintPersonalDataPolicy = () => printSimplePDF(personalDataPolicy)

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

			{isReg && (
				<div className={styles.agreements}>
					<Checkbox {...register('agreements')} defaultChecked />
					<p>
						Согласен с условиями{' '}
						<span onClick={handlePrintContract}>Договора-оферты</span> и{' '}
						<span onClick={handlePrintPersonalDataPolicy}>
							Политикой обработки персональных данных
						</span>{' '}
						.
					</p>
				</div>
			)}
		</>
	)
}
export default AuthFields
