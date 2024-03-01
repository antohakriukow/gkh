import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '~/components/ui'

import { IServiceData } from '../prices.interface'

import styles from './ServiceCard.module.scss'

const ServiceCard: FC<IServiceData> = ({ title, description, price, link }) => {
	const navigate = useNavigate()
	const handleClick = () => navigate(link)

	return (
		<div className={styles.container}>
			<div>
				<h4 className={styles.title}>{title}</h4>
				<p className={styles.description}>{description}</p>
			</div>
			<div>
				<p className={styles.price}>{price}</p>
				<Button onClick={handleClick}>Перейти</Button>
			</div>
		</div>
	)
}
export default ServiceCard
