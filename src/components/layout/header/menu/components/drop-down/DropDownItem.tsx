import { IDropDownItem } from './drop-down.interface'
import { FC } from 'react'

import styles from './DropDown.module.scss'

const DropDownItem: FC<IDropDownItem> = ({ inn, name, onClick }) => {
	return (
		<div onClick={() => onClick(inn)} className={styles.item}>
			<p className={styles.title}>{name.short}</p>
		</div>
	)
}
export default DropDownItem
