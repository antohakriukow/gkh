import LoginForm from './auth/LoginForm'
import Presentation from './presentation/Presentation'
import { FC } from 'react'

import styles from './Landing.module.scss'

const LoginPage: FC = () => {
	return (
		<section className={styles.landing}>
			<Presentation />
			<LoginForm />
		</section>
	)
}
export default LoginPage
