import FAQButton from './menu/buttons/FAQButton'
import { FC } from 'react'

import HeaderMenu from '~/components/layout/header/menu/HeaderMenu'
import SupportButton from '~/components/layout/header/menu/buttons/SupportButton'

import { useAuth } from '~/hooks/useAuth'

import styles from './Header.module.scss'

const Header: FC = () => {
	const { user } = useAuth()

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.title}>Экспресс 22</div>
				{!!user && (
					<div className={styles.tools}>
						<SupportButton />
						<FAQButton />
						<HeaderMenu />
						{/* <SettingsButton /> */}
					</div>
				)}
			</div>
		</div>
	)
}
export default Header
