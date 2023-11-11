import { IDropDownItem } from './drop-down.interface'
import { FC } from 'react'

import { useActions } from '~/hooks/useActions'
import { useData } from '~/hooks/useData'

import styles from '../Company.module.scss'

const DropDownItem: FC<IDropDownItem> = ({ inn, name }) => {
	const { setCurrentCompany } = useActions()
	const { companies } = useData()

	const handleClick = () => {
		const current = companies.find(company => company.inn === inn)
		setCurrentCompany(current ? current : companies[0])
	}

	return (
		<div
			id={inn.toString()}
			className={styles.dropDown__item}
			onClick={handleClick}
		>
			<p className={styles.dropDown__name}>{name.short}</p>
		</div>
	)
}
export default DropDownItem
