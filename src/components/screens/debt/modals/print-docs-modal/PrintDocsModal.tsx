import PrintItem from './PrintItem'
import { printData } from './data'
import { FC } from 'react'

import { IDebt } from '~/shared/types/debts/debt.interface'

import styles from './PrintDocsModal.module.scss'

const PrintDocsModal: FC<{ debt: IDebt }> = ({ debt }) => {
	return (
		<div className={styles.container}>
			{printData.map(({ type, printFunction, title }, index) => (
				<PrintItem
					key={index}
					type={type}
					printFunction={printFunction}
					title={title}
					debt={debt}
				/>
			))}
		</div>
	)
}
export default PrintDocsModal
