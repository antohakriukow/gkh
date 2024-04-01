import { FC } from 'react'

import styles from '../../../shared/table-parts/table.module.scss'

const Header: FC = () => {
	return (
		<div className={styles.row}>
			<div></div>
			<div>Контрагент</div>
			<div>Доходы, руб.</div>
			<div>Расходы, руб.</div>
		</div>
	)
}
export default Header
