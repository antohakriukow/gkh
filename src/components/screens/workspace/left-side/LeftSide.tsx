import Company from './components/Company'
import Reports from './components/Reports'
import User from './components/User'
import { FC } from 'react'

import styles from '../Workspace.module.scss'

const LeftSide: FC = () => {
	return (
		<div className={styles.workspace__leftSide}>
			<User />
			<Company />
			<Reports />
		</div>
	)
}
export default LeftSide
