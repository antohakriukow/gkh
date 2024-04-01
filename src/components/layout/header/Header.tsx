import FAQButton from './menu/buttons/FAQButton'
import { menuItems, mobileMenuItems } from './menu/menu.data'
import cn from 'clsx'
import { FC, useCallback, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useActions, useAuth, useWindowWidth } from '~/hooks'

import HeaderMenu from '~/components/layout/header/menu/HeaderMenu'
import SupportButton from '~/components/layout/header/menu/buttons/SupportButton'

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

	const isActive = useCallback(
		(path: string) => location.pathname === path,
		[location.pathname]
	)

	const handleClick = useCallback(
		(item: IMenuItem) => {
			setCurrentReport(null)
			navigate(item.path)
		},
		[navigate, setCurrentReport]
	)

	const menuData = useMemo(
		() => (width > 480 ? menuItems : mobileMenuItems),
		[width]
	)

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.menu}>
					{menuData.map(item => (
						<div
							key={item.path}
							className={cn(styles.menuItem, item.className, {
								[styles.active]: isActive(item.path)
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
