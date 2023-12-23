import { useWorkspace } from './useWorkspace'
import { FC } from 'react'

import ReportEditor from '../report/ReportEditor'
import Reports from '../reports/Reports'

import styles from './Workspace.module.scss'

const Workspace: FC = () => {
	const { currentReport } = useWorkspace()

	return (
		<div className={styles.overlay}>
			{currentReport === null ? <Reports /> : <ReportEditor />}
		</div>
	)
}
export default Workspace
