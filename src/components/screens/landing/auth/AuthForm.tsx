import AuthFields from './AuthFields'
import { IAuthInput } from './auth.interface'
import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button, Heading } from '~/components/ui'
import SubHeading from '~/components/ui/heading/SubHeading'

import { useAuth } from '~/hooks/useAuth'

import { useRedirect } from '../../../../hooks/useRedirect'
import ScrollButton from '../ScrollButton'

import styles from './Auth.module.scss'

const AuthForm: FC = () => {
	const [isReg, setIsReg] = useState(true)
	const { navigateToResetPassword } = useRedirect()

	const [width, setWidth] = useState(window.innerWidth)

	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth)
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	const isNarrow = width <= 800

	const { login, register, isLoading } = useAuth()

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
		if (isReg) {
			register(email, password)
		} else {
			login(email, password)
		}
		reset()
	}

	const isValid = formState.isValid
	const hasAgreement = watch('agreements')

	const toggleReg = () => setIsReg(!isReg)

	return (
		<div className={styles.container}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<Heading
					title={isReg ? `Добро пожаловать` : `Вход`}
					className={styles.heading}
				/>

				<SubHeading
					title={
						isReg
							? `Зарегистрируйте новый аккаунт`
							: `Введите Ваш логин и пароль`
					}
					className={styles.subheading}
				/>

				<AuthFields
					formState={formState}
					register={registerInput}
					watch={watch}
					isReg={isReg}
					isPasswordRequired
				/>

				<Button
					className={styles.button}
					type='submit'
					disabled={isLoading || !isValid || !hasAgreement}
				>
					{isReg ? `Получить доступ` : `Войти`}
				</Button>
				<div className={styles.switcherTitle}>
					{isReg ? 'У меня уже есть аккаунт.' : 'У меня еще нет аккаунта.'}
				</div>
				<div onClick={toggleReg} className={styles.switcherPressable}>
					{isReg ? 'Войти' : 'Зарегистрироваться'}
				</div>
				<div
					onClick={navigateToResetPassword}
					className={styles.resetPasswordButton}
				>
					Забыли пароль?
				</div>
			</form>
			{isNarrow && <ScrollButton scrollDirection='up' />}
		</div>
	)
}
export default AuthForm
