import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { IReport } from '~/shared/types/report.interface'

import { convertPeriod, convertTypeReport } from '~/utils/report.utils'
import { convertTimestampToDate } from '~/utils/time.utils'

import styles from '../Table.module.scss'

const TableItem: FC<{ report: IReport }> = ({ report }) => {
	const navigate = useNavigate()

	const handleOpenReport = () => {
		navigate(`/reports/edit/${report._id}`)
	}

	return (
		<div key={report._id} onClick={handleOpenReport} className={styles.item}>
			<div className={styles.cell}>{convertTypeReport(report.type)}</div>
			<div className={styles.cell}>{`${convertPeriod(report.period)} ${
				report.year
			} г.`}</div>
			<div className={styles.cell}>
				{convertTimestampToDate(+report.updatedAt)}
			</div>
		</div>
	)
}
export default TableItem
