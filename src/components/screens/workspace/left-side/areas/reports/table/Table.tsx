import TableHeader from './components/TableHeader'
import TableItem from './components/TableItem'
import { FC } from 'react'

import { useReport } from '../useReport'

import styles from './Table.module.scss'

const Table: FC = () => {
	const { reports, currentCompany } = useReport()

	const filteredReports = reports.filter(
		report => report.company.inn === currentCompany?.inn
	)

	if (filteredReports.length === 0) return null

	return (
		<div className={styles.table}>
			<TableHeader />
			{filteredReports.map(report => (
				<TableItem
					key={report._id}
					_id={report._id}
					year={report.year}
					period={report.period}
					type={report.type}
					updatedAt={report.updatedAt}
				/>
			))}
		</div>
	)
}
export default Table
