import TableHeader from './components/TableHeader'
import TableItem from './components/TableItem'
import { FC } from 'react'

import { useWorkspace } from '../../workspace/useWorkspace'

import styles from './Table.module.scss'

const Table: FC = () => {
	const { reports, currentCompany } = useWorkspace()

	const filteredReports = reports.filter(
		report => report.company.inn === currentCompany?.inn
	)

	if (filteredReports.length === 0) return null

	return (
		<>
			<div className={styles.table}>
				<TableHeader />
				{filteredReports.map(report => (
					<TableItem key={report._id} report={report} />
				))}
			</div>
		</>
	)
}
export default Table
