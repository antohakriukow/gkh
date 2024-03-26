import FAQButton from './menu/buttons/FAQButton'
import { menuItems, mobileMenuItems } from './menu/menu.data'
import cn from 'clsx'
import { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import HeaderMenu from '~/components/layout/header/menu/HeaderMenu'
import SupportButton from '~/components/layout/header/menu/buttons/SupportButton'

import { useActions } from '~/hooks/useActions'
import { useAuth } from '~/hooks/useAuth'
import { useWindowWidth } from '~/hooks/useWindowWidth'

import styles from './Header.module.scss'

interface IMenuItem {
	title: string
	path: string
}

const Header: FC = () => {
	const { user } = useAuth()
	const navigate = useNavigate()
	const { width } = useWindowWidth()
	const location = useLocation()
	const { setCurrentReport } = useActions()

	const isActive = (path: string) => location.pathname === path

	function handleClick(item: IMenuItem) {
		setCurrentReport(null)
		navigate(item.path)
	}

	const menuData = width > 480 ? menuItems : mobileMenuItems

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.menu}>
					{menuData.map(item => (
						<div
							key={item.path}
							className={cn(styles.menuItem, {
								[styles.active]: isActive(item.path),
								['reportsAnchor']: item.title.includes('22-ЖКХ'),
								['annualsAnchor']:
									item.title.includes('ОИС') ||
									item.title.includes('Исполнение сметы'),
								['priceAnchor']: item.title.includes('Цены')
							})}
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
		</div>
	)
}
export default Header
