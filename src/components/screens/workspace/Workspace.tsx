import ReportEditor from './components/report-editor/ReportEditor'
import ReportList from './components/report-list/ReportList'
import { useWorkspace } from './useWorkspace'
import { FC } from 'react'

import styles from './Workspace.module.scss'

const Workspace: FC = () => {
	const { currentReport } = useWorkspace()

	return (
		<div className={styles.overlay}>
			{currentReport ? <ReportEditor /> : <ReportList />}
		</div>
	)
}
export default Workspace
