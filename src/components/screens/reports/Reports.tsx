import Support from './support/Support'
import Table from './table/Table'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import AddReportBtn from '~/components/screens/reports/buttons/AddReportBtn'
import ReportModal from '~/components/screens/reports/modals/add-report-modal/AddReportModal'
import { Heading } from '~/components/ui'

import { useModal } from '~/hooks/useModal'

import styles from './Reports.module.scss'

const Reports: FC = () => {
	const { showModal } = useModal()
	const navigate = useNavigate()

	const handleOpenReport = (reportId: number) => {
		navigate(`/reports/edit/${reportId}`)
	}

	const handleAdd = () =>
		showModal(<ReportModal handleOpenReport={handleOpenReport} />)

	return (
		<div className={styles.container}>
			<div className={styles.headingContainer}>
				<Heading title='Отчеты' className={styles.heading} />
				<Support />
			</div>
			<AddReportBtn onClick={handleAdd} />
			<Table />
		</div>
	)
}
export default Reports
