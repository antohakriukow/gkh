import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button, Heading } from '~/components/ui'

import { useAuth } from '~/hooks/useAuth'

import styles from './Auth.module.scss'
import AuthFields from './AuthFields'
import { IAuthInput } from './auth.interface'
import { useAuthRedirect } from './useAuthRedirect'

const Auth: FC = () => {
	const [isReg, setIsReg] = useState(false)
	useAuthRedirect()

	const { login, register, isLoading } = useAuth()

	const {
		register: registerInput,
		handleSubmit,
		formState,
		reset
	} = useForm<IAuthInput>({
		mode: 'onChange'
	})

	const onSubmit: SubmitHandler<IAuthInput> = ({ email, password }) => {
		if (isReg) {
			register(email, password)
		} else {
			login(email, password)
		}
		reset()
	}

	const toggleReg = () => setIsReg(!isReg)

	return (
		<section className={styles.auth__wrapper}>
			<form className={styles.auth__form} onSubmit={handleSubmit(onSubmit)}>
				<Heading title={isReg ? `Регистрация` : `Вход`} className='mb-6' />

				<AuthFields
					formState={formState}
					register={registerInput}
					isPasswordRequired
				/>

				<Button type='submit' disabled={isLoading}>
					{isReg ? `Получить доступ` : `Войти`}
				</Button>
				<div className={styles.auth_switcher_title}>
					{isReg ? 'У меня уже есть аккаунт.' : 'У меня еще нет аккаунта.'}
				</div>
				<div onClick={toggleReg} className={styles.auth_switcher_pressable}>
					{isReg ? 'Войти' : 'Зарегистрироваться'}
				</div>
			</form>
		</section>
	)
}
export default Auth
