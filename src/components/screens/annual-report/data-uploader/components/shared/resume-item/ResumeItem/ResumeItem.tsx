import { FC } from 'react'

import styles from './resume-item.module.scss'

const ResumeItem: FC<{ parameter: string; value: string }> = ({
	parameter,
	value
}) => (
	<div className={styles.item}>
		<p>{parameter}: </p>
		<p>{value}</p>
	</div>
)
export default ResumeItem
