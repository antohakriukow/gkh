import { IBenefit } from './interface.presentation'
import { FC } from 'react'

import styles from './Presentation.module.scss'

const Benefit: FC<IBenefit> = ({ title, subTitle }) => {
	return (
		<li className={styles.benefit}>
			<p className={styles.title}>{title}</p>
			<p className={styles.subTitle}>{subTitle}</p>
		</li>
	)
}
export default Benefit
