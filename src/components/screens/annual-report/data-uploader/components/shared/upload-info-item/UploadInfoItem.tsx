import { FC } from 'react'

import styles from './upload-info-item.module.scss'

const UploadInfoItem: FC<{ title: string; value: string }> = ({
	title,
	value
}) => (
	<div className={styles.item}>
		<p>{title}: </p>
		<p>{value}</p>
	</div>
)
export default UploadInfoItem
