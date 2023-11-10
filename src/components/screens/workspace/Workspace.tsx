import LeftSide from './left-side/LeftSide'
import { FC } from 'react'

import styles from './Workspace.module.scss'

const Workspace: FC = () => {
	return (
		<div className={styles.workspace__overlay}>
			<LeftSide />
			<div className={styles.workspace}>Workspace</div>
		</div>
	)
}
export default Workspace
