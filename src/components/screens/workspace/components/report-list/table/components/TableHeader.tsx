import { FC } from 'react'

import styles from '../Table.module.scss'

const TableHeader: FC = () => {
	return (
		<div className={styles.header}>
			<div>Наименование</div>
			<div>Период</div>
			<div>Дата изменения</div>
		</div>
	)
}
export default TableHeader
