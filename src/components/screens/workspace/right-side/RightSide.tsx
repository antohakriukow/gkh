import { FC } from 'react'

import { useModal } from '~/hooks/useModal'

import styles from '../Workspace.module.scss'
import ReportModal from '../left-side/areas/reports/modal/ReportModal'
import AddReportBtn from '../shared/AddReportBtn'

const RightSide: FC = () => {
	const { showModal } = useModal()

	const handleAdd = () => showModal(<ReportModal />)
	return (
		<div className={styles.workspace__rightSide}>
			<div
				style={{
					maxWidth: 240,
					display: 'flex',
					flexDirection: 'column',
					margin: 'auto',
					paddingTop: 42
				}}
			>
				<AddReportBtn onClick={handleAdd} />
			</div>
		</div>
	)
}
export default RightSide
