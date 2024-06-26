import { IPrintData } from './interface'
import { FC } from 'react'
import { TbFileTypeDocx, TbFileTypePdf } from 'react-icons/tb'

import { IDebt } from '~/shared/types/debts/debt.interface'

import styles from './PrintDocsModal.module.scss'

interface Props extends IPrintData {
	debt: IDebt
}

const PrintItem: FC<Props> = ({ type, printFunction, title, debt }) => (
	<div className={styles.item} onClick={() => printFunction(debt)}>
		{type === 'docx' ? (
			<TbFileTypeDocx size={32} color='#828dc9' />
		) : (
			<TbFileTypePdf size={32} color='#e25a66' />
		)}
		<p>{title}</p>
	</div>
)

export default PrintItem
