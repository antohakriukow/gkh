import AuthForm from './auth/AuthForm'
import Presentation from './presentation/Presentation'
import { FC } from 'react'

import styles from './Landing.module.scss'

const Landing: FC = () => {
	return (
		<section className={styles.landing}>
			<Presentation />
			<AuthForm />
		</section>
	)
}
export default Landing
