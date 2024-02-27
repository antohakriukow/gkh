import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useActions } from '~/hooks/useActions'

import styles from './SubHeader.module.scss'

interface IMenuItem {
	title: string
	path: string
}

interface SubHeaderProps {
	menuItems: IMenuItem[]
}

const SubHeader: React.FC<SubHeaderProps> = ({ menuItems }) => {
	const navigate = useNavigate()
	const location = useLocation()
	const { setCurrentAnnualReport, setCurrentReport } = useActions()

	const isActive = (path: string) => location.pathname === path

	const handleClick = (item: IMenuItem) => {
		setCurrentAnnualReport(null)
		setCurrentReport(null)
		navigate(item.path)
	}

	return (
		<div className={styles.subHeader}>
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
	)
}

export default SubHeader
