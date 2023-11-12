import { FC } from 'react'

import styles from '../Table.module.scss'

const TableHeader: FC = () => {
	return (
		<div className={styles.tableHeader}>
			<div className={styles.headerCell}>Период</div>
			<div className={styles.headerCell}>Тип</div>
			<div className={styles.headerCell}>Дата изменения</div>
		</div>
	)
}
export default TableHeader
