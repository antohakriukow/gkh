import { FC, useEffect, useState } from 'react'
import { BiSupport } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

import { Button } from '~/components/ui'

import styles from './buttons.module.scss'

const SupportButton: FC = () => {
	const navigate = useNavigate()
	const [width, setWidth] = useState(window.innerWidth)

	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth)
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	const isNarrow = width <= 500
	const isMobile = width <= 400

	const navigateToIssues = () => {
		navigate(`/issues`)
	}

	const title = isNarrow ? 'Техподдержка' : 'Сообщить о проблеме'

	return (
		<>
			{isMobile ? (
				<BiSupport
					className={styles.supportIcon}
					color='#df4956'
					size={20}
					onClick={navigateToIssues}
				/>
			) : (
				<button className={styles.supportButton} onClick={navigateToIssues}>
					{title}
				</button>
			)}
		</>
	)
}
export default SupportButton
