import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import styles from './SubHeader.module.scss'

interface MenuItem {
	title: string
	path: string
}

interface SubHeaderProps {
	menuItems: MenuItem[]
}

const SubHeader: React.FC<SubHeaderProps> = ({ menuItems }) => {
	const navigate = useNavigate()
	const location = useLocation()

	const isActive = (path: string) => location.pathname === path

	return (
		<div className={styles.subHeader}>
			{menuItems.map(item => (
				<div
					key={item.path}
					className={`${styles.menuItem} ${
						isActive(item.path) ? styles.active : ''
					}`}
					onClick={() => navigate(item.path)}
				>
					<p>{item.title}</p>
				</div>
			))}
		</div>
	)
}

export default SubHeader
