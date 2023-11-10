import { FC } from 'react'

import { Button } from '~/components/ui'

import { useAuth } from '~/hooks/useAuth'

import styles from './Header.module.scss'

const Header: FC = () => {
	const { user, logout } = useAuth()

	return (
		<div className={styles.header}>
			<div className={styles.title}>Генератор отчетов 22-ЖКХ</div>
			{!!user && (
				<Button onClick={logout} className={styles.button}>
					Выйти
				</Button>
			)}
		</div>
	)
}
export default Header
