import { FC } from 'react'

import { useData } from '~/hooks/useData'

import styles from '../../../Workspace.module.scss'

const UserArea: FC = () => {
	const { userId } = useData()
	return (
		<div className={styles.user__idContainer}>
			<h4 className={styles.user__idTitle}>ID: </h4>
			<p className={styles.user__id}>{userId}</p>
		</div>
	)
}
export default UserArea
