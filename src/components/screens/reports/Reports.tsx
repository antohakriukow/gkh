import Table from './table/Table'
import { FC } from 'react'

import AddReportBtn from '~/components/screens/reports/buttons/AddReportBtn'
import ReportModal from '~/components/screens/reports/modals/add-report-modal/AddReportModal'

import { useModal } from '~/hooks/useModal'

import styles from './Reports.module.scss'

const Reports: FC = () => {
	const { showModal } = useModal()

	const handleAdd = () => showModal(<ReportModal />)

	return (
		<div className={styles.container}>
			<Table />
			<AddReportBtn onClick={handleAdd} />
		</div>
	)
}
export default Reports
