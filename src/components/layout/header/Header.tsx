import SettingsButton from './settings/SettingsButton'
import { FC } from 'react'

import HeaderMenu from '~/components/layout/header/menu/HeaderMenu'

import { useAuth } from '~/hooks/useAuth'

import styles from './Header.module.scss'

const Header: FC = () => {
	const { user } = useAuth()

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.title}>Генератор отчетов 22-ЖКХ</div>
				{!!user && (
					<div className={styles.tools}>
						<HeaderMenu />
						{/* <SettingsButton /> */}
					</div>
				)}
			</div>
		</div>
	)
}
export default Header
