import FAQButton from './menu/buttons/FAQButton'
import SubHeader from './sub-header/SubHeader'
import { menuItems } from './sub-header/sub-header.data'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import HeaderMenu from '~/components/layout/header/menu/HeaderMenu'
import SupportButton from '~/components/layout/header/menu/buttons/SupportButton'

import { useAuth } from '~/hooks/useAuth'

import styles from './Header.module.scss'

const Header: FC = () => {
	const { user } = useAuth()
	const navigate = useNavigate()
	const goHome = () => navigate(`/reports`)

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.title} onClick={goHome}>
					Экспресс 22
				</div>
				{!!user && (
					<div className={styles.tools}>
						<SupportButton />
						<FAQButton />
						<HeaderMenu />
					</div>
				)}
			</div>
			<SubHeader menuItems={menuItems} />
		</div>
	)
}
export default Header
