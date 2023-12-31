import { FC, useEffect, useState } from 'react'
import { BiSupport } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

import { Button } from '~/components/ui'

import styles from './Support.module.scss'

const Support: FC = () => {
	const navigate = useNavigate()
	const [width, setWidth] = useState(window.innerWidth)

	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth)
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	const isNarrow = width <= 680

	const navigateToIssues = () => {
		navigate(`/issues`)
	}

	const title = isNarrow ? 'Техподдержка' : 'Сообщить о проблеме'

	return (
		<Button className={styles.button} onClick={navigateToIssues}>
			{title}
		</Button>
	)
}
export default Support
