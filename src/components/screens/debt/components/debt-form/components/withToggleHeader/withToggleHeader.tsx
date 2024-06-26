import { Typography } from '@mui/material'
import { FC, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6'

import styles from './withToggleHeader.module.scss'

const withToggleHeader = (WrappedComponent: FC, title: string) => {
	const WithToggleHeader = () => {
		const [isVisible, setIsVisible] = useState(true)
		const toggleVisible = () => setIsVisible(!isVisible)

		return (
			<div className={styles.container}>
				<div className={styles.header}>
					<Typography variant='h6'>{title}</Typography>
					<div onClick={toggleVisible}>
						<Typography variant='body1'>
							{isVisible ? 'Скрыть' : 'Показать'}
						</Typography>
						{isVisible ? <FaChevronUp /> : <FaChevronDown />}
					</div>
				</div>
				{isVisible && (
					<div className={styles.content}>
						<WrappedComponent />
					</div>
				)}
			</div>
		)
	}

	WithToggleHeader.displayName = `WithToggleHeader(${
		WrappedComponent.displayName || WrappedComponent.name || 'Component'
	})`

	return WithToggleHeader
}

export default withToggleHeader
