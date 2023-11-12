import ReportModal from './modal/ReportModal'
import Table from './table/Table'
import { FC } from 'react'

import AddReportBtn from '~/components/screens/workspace/shared/AddReportBtn'

import { useModal } from '~/hooks/useModal'

import styles from './Reports.module.scss'

const ReportsArea: FC = () => {
	const { showModal } = useModal()

	const handleAdd = () => showModal(<ReportModal />)

	return (
		<div className={styles.reports__container}>
			<AddReportBtn onClick={handleAdd} />
			<Table />
		</div>
	)
}
export default ReportsArea
