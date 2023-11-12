import { FC } from 'react'

import { IReportTableItem } from '~/shared/types/report.interface'

import { convertTypeReport } from '~/utils/report.utils'
import { convertTimestampToDate } from '~/utils/time.utils'

import styles from '../Table.module.scss'

const TableItem: FC<IReportTableItem> = ({
	year,
	period,
	type,
	updatedAt,
	_id
}) => {
	const handleClick = () => console.log(`Open report with id ${_id}`)

	return (
		<div onClick={handleClick} className={styles.tableItem}>
			<div className={styles.cell}>{`${year}-${period}`}</div>
			<div className={styles.cell}>{convertTypeReport(type)}</div>
			<div className={styles.cell}>{convertTimestampToDate(+updatedAt)}</div>
		</div>
	)
}
export default TableItem
