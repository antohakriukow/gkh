import { FC } from 'react'

import styles from '../SeparateModal.module.scss'

interface IOperationInfoProps {
	title: string
	description: string
}

const OperationInfo: FC<IOperationInfoProps> = ({ title, description }) => {
	return (
		<p className={styles.info}>
			<span>{title}</span>
			{description}
		</p>
	)
}
export default OperationInfo
