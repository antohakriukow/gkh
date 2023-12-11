import { FC } from 'react'
import { MdAccountBox } from 'react-icons/md'

import { useHeader } from '../../../useHeader'
import styles from '../../HeaderMenu.module.scss'

const ProfileButton: FC = () => {
	const { userId } = useHeader()

	return (
		<div className={styles.profileContainer}>
			<MdAccountBox color='#df4956' size={20} style={{ cursor: 'pointer' }} />
			<p className={styles.profileTitle}>Код Клиента: </p>
			<p className={styles.profileId}>{userId}</p>
		</div>
	)
}
export default ProfileButton
