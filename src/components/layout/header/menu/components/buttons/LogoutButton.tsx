import { FC } from 'react'
import { RiLogoutBoxLine } from 'react-icons/ri'

import { useHeader } from '../../../useHeader'
import styles from '../../HeaderMenu.module.scss'

const LogoutButton: FC = () => {
	const { handleLogout } = useHeader()

	return (
		<div onClick={handleLogout} className={styles.button}>
			<RiLogoutBoxLine
				color='#df4956'
				size={20}
				style={{ cursor: 'pointer' }}
			/>
			<p className={styles.buttonTitle}>Выйти</p>
		</div>
	)
}
export default LogoutButton
