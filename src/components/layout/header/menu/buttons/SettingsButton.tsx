import { FC } from 'react'
import { IoSettingsSharp } from 'react-icons/io5'

import styles from './buttons.module.scss'

const SettingsButton: FC = () => {
	const handlePress = () => console.log('SettingsButton is pressed')

	return (
		<IoSettingsSharp
			onClick={handlePress}
			color='#df4956'
			size={20}
			className={styles.settings}
		/>
	)
}
export default SettingsButton
