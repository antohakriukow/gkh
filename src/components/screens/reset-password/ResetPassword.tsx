import { useResetPassword } from './useResetPassword'
import { FC } from 'react'
import { FieldError, SubmitHandler, useForm } from 'react-hook-form'

import {
	AuthField,
	Button,
	Heading,
	HomeButton,
	SubHeading
} from '~/components/ui'

import { validEmail } from '~/shared/regex'

import { IAuthInput } from '../landing/auth/auth.interface'

import styles from './ResetPassword.module.scss'

const ResetPassword: FC = () => {
	const { isLoading, handleResetPassword } = useResetPassword()
	const { register, handleSubmit, formState } = useForm<IAuthInput>({
		mode: 'onChange'
	})

	const onSubmit: SubmitHandler<IAuthInput> = ({ email }) =>
		handleResetPassword(email)

	const isValid = formState.isValid
	const PASSWORD_RECOVERY = 'Восстановление пароля'
	const ENTER_EMAIL_TO_RESTORE_PASSWORD =
		'Для восстановления пароля введите Ваш email.'
	const REQUIRED_FIELD = 'Это обязательное поле'
	const ENTER_VALID_EMAIL = 'Введите валидный email'
	const RESTORE_PASSWORD = 'Восстановить пароль'

	return (
		<div className={styles.wrapper}>
			<HomeButton />
			<div className={styles.container}>
				<Heading title={PASSWORD_RECOVERY} className={styles.heading} />
				<SubHeading
					title={ENTER_EMAIL_TO_RESTORE_PASSWORD}
					className={styles.subheading}
				/>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<AuthField
						{...register('email', {
							required: REQUIRED_FIELD,
							pattern: {
								value: validEmail,
								message: ENTER_VALID_EMAIL
							}
						})}
						placeholder='E-mail'
						error={formState.errors.email as FieldError}
					/>

					<Button
						title={RESTORE_PASSWORD}
						className={styles.button}
						type='submit'
						disabled={isLoading || !isValid}
					/>
				</form>
			</div>
		</div>
	)
}

export default ResetPassword
