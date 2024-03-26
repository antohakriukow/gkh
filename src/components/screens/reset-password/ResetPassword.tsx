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

	return (
		<div className={styles.wrapper}>
			<HomeButton />
			<div className={styles.container}>
				<Heading title={'Восстановление пароля'} className={styles.heading} />
				<SubHeading
					title='Для восстановления пароля введите Ваш email.'
					className={styles.subheading}
				/>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<AuthField
						{...register('email', {
							required: 'Это обязательное поле',
							pattern: {
								value: validEmail,
								message: 'Введите валидный email'
							}
						})}
						placeholder='E-mail'
						error={formState.errors.email as FieldError}
					/>

					<Button
						className={styles.button}
						type='submit'
						disabled={isLoading || !isValid}
					>
						Восстановить пароль
					</Button>
				</form>
			</div>
		</div>
	)
}

export default ResetPassword
