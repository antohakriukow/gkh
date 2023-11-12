import LeftSide from './left-side/LeftSide'
import RightSide from './right-side/RightSide'
import { FC } from 'react'

import styles from './Workspace.module.scss'

const Workspace: FC = () => {
	return (
		<div className={styles.workspace__overlay}>
			<LeftSide />
			<RightSide />
		</div>
	)
}
export default Workspace
