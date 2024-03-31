import AuthFields from './AuthFields'
import { IAuthInput } from './auth.interface'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAuth, useRedirect } from '~/hooks'

import { Button, Heading } from '~/components/ui'
import SubHeading from '~/components/ui/heading/SubHeading'

import styles from './Auth.module.scss'

const RegisterForm: FC = () => {
	const { navigateToResetPassword, navigateToLogin } = useRedirect()

	const { register, isLoading } = useAuth()

	const {
		register: registerInput,
		handleSubmit,
		formState,
		reset,
		watch
	} = useForm<IAuthInput>({
		mode: 'onChange',
		defaultValues: {
			agreements: true
		}
	})

	const onSubmit: SubmitHandler<IAuthInput> = ({ email, password }) => {
		if (!password) return
		register(email, password)
		reset()
	}

	const isValid = formState.isValid
	const hasAgreement = watch('agreements')

	return (
		<div className={styles.container}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<Heading title='Добро пожаловать' />

				<SubHeading
					title='Зарегистрируйте новый аккаунт'
					className={styles.subheading}
				/>

				<AuthFields
					formState={formState}
					register={registerInput}
					watch={watch}
					isReg
					isPasswordRequired
				/>

				<Button
					className={styles.button}
					type='submit'
					disabled={isLoading || !isValid || !hasAgreement}
				>
					Получить доступ
				</Button>
				<div className={styles.switcherTitle}>У меня уже есть аккаунт.</div>
				<div onClick={navigateToLogin} className={styles.switcherPressable}>
					Войти
				</div>
				<div
					onClick={navigateToResetPassword}
					className={styles.resetPasswordButton}
				>
					Забыли пароль?
				</div>
			</form>
		</div>
	)
}
export default RegisterForm
