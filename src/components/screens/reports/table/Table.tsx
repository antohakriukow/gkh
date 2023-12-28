import TableHeader from './components/TableHeader'
import TableItem from './components/TableItem'
import { FC } from 'react'

import { useData } from '~/hooks/useData'
import { useTypedSelector } from '~/hooks/useTypedSelector'

import styles from './Table.module.scss'

const Table: FC = () => {
	const { reports } = useData()
	const { currentCompany } = useTypedSelector(state => state.ui)

	const filteredReports = reports.filter(
		report => report.company.inn === currentCompany?.inn
	)

	if (filteredReports.length === 0) return null

	return (
		<>
			<div className={styles.table}>
				<TableHeader />
				<div className={styles.body}>
					{filteredReports.map(report => (
						<TableItem key={report._id} report={report} />
					))}
				</div>
			</div>
		</>
	)
}
export default Table
