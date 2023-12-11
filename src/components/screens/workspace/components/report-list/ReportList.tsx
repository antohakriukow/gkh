import Table from './table/Table'
import { FC } from 'react'

import ReportModal from '~/components/modals/add-report-modal/AddReportModal'
import AddReportBtn from '~/components/screens/workspace/components/buttons/AddReportBtn'

import { useModal } from '~/hooks/useModal'

import styles from './ReportList.module.scss'

const ReportList: FC = () => {
	const { showModal } = useModal()

	const handleAdd = () => showModal(<ReportModal />)

	return (
		<div className={styles.reports__container}>
			<Table />
			<AddReportBtn onClick={handleAdd} />
		</div>
	)
}
export default ReportList
