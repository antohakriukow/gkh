import Service from './Service'
import { servicesData } from './services.data'
import { FC, useEffect, useState } from 'react'

import ScrollButton from '../ScrollButton'

import styles from './Presentation.module.scss'

const Presentation: FC = () => {
	const [width, setWidth] = useState(window.innerWidth)

	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth)
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	const isNarrow = width <= 800

	return (
		<div className={styles.container}>
			<div className={styles.presentation}>
				<h3 className={styles.heading}>22gkh.ru</h3>
				<p className={styles.description}>
					Бесплатный сервис для бухгалтера ЖКХ
				</p>
				<ul>
					{servicesData.map((service, index) => (
						<Service
							key={index}
							title={service.title}
							bullets={service.bullets}
							links={service.links}
						/>
					))}
				</ul>

				{isNarrow && <ScrollButton scrollDirection='down' />}
			</div>
		</div>
	)
}
export default Presentation
