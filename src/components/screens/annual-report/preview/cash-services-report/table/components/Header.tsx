import cn from 'clsx'
import { FC } from 'react'

import styles from '../../../shared/table-parts/table.module.scss'

const Header: FC = () => {
	return (
		<div className={cn(styles.row)}>
			<div></div>
			<div>Услуга</div>
			<div>Начислено</div>
			<div>Доходы</div>
			<div>Расходы</div>
		</div>
	)
}
export default Header
