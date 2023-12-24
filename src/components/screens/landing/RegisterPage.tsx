import RegisterForm from './auth/RegisterForm'
import Presentation from './presentation/Presentation'
import { FC } from 'react'

import styles from './Landing.module.scss'

const RegisterPage: FC = () => {
	return (
		<section className={styles.landing}>
			<Presentation />
			<RegisterForm />
		</section>
	)
}
export default RegisterPage
