import CompanyArea from './areas/company/Company'
import ReportsArea from './areas/reports/Reports'
import UserArea from './areas/user/User'
import { FC } from 'react'

import styles from '../Workspace.module.scss'

const LeftSide: FC = () => {
	return (
		<div className={styles.workspace__leftSide}>
			<UserArea />
			<CompanyArea />
			<ReportsArea />
		</div>
	)
}
export default LeftSide
