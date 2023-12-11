import { IDropDownItem } from './drop-down.interface'
import cn from 'clsx'
import { FC } from 'react'

import styles from './DropDown.module.scss'

const DropDownItem: FC<IDropDownItem> = ({ inn, name, onClick, noHover }) => {
	return (
		<div
			onClick={() => onClick(inn)}
			className={cn(styles.item, {
				[styles.noHover]: noHover
			})}
		>
			<p className={styles.title}>{name.short}</p>
		</div>
	)
}
export default DropDownItem
