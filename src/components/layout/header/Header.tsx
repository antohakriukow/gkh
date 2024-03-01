import FAQButton from './menu/buttons/FAQButton'
import { menuItems } from './menu/menu.data'
import { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import HeaderMenu from '~/components/layout/header/menu/HeaderMenu'
import SupportButton from '~/components/layout/header/menu/buttons/SupportButton'

import { useActions } from '~/hooks/useActions'
import { useAuth } from '~/hooks/useAuth'

import styles from './Header.module.scss'

interface IMenuItem {
	title: string
	path: string
}

const Header: FC = () => {
	const { user } = useAuth()
	const navigate = useNavigate()
	// const goHome = () => navigate(`/reports`)
	const location = useLocation()
	const { setCurrentAnnualReport, setCurrentReport } = useActions()

	const isActive = (path: string) => location.pathname === path

	function handleClick(item: IMenuItem) {
		setCurrentAnnualReport(null)
		setCurrentReport(null)
		navigate(item.path)
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.menu}>
					{menuItems.map(item => (
						<div
							key={item.path}
							className={`${styles.menuItem} ${
								isActive(item.path) ? styles.active : ''
							}`}
							onClick={() => handleClick(item)}
						>
							<p>{item.title}</p>
						</div>
					))}
				</div>
				{!!user && (
					<div className={styles.tools}>
						<SupportButton />
						<FAQButton />
						<HeaderMenu />
					</div>
				)}
			</div>
			{/* <SubHeader menuItems={menuItems} /> */}
		</div>
	)
}
export default Header
