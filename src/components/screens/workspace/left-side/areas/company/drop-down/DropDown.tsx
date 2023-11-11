import DropDownItem from './DropDownItem'
import { IDropDown } from './drop-down.interface'
import { FC, useState } from 'react'
import { FaChevronDown, FaChevronUp, FaPlus } from 'react-icons/fa'

import { useTypedSelector } from '~/hooks/useTypedSelector'

import AddBtn from '../AddBtn'
import styles from '../Company.module.scss'

const DropDown: FC<IDropDown> = ({ data, onClick }) => {
	const [isDropDownOpened, setIsDropDownOpened] = useState(false)
	const { currentCompany } = useTypedSelector(state => state.ui)

	const toggleDropDown = () => setIsDropDownOpened(!isDropDownOpened)

	if (data.length === 1)
		return (
			<div className={styles.dropDown__item}>
				<div
					id={currentCompany?.inn.toString()}
					className={styles.dropDown__title}
				>
					{currentCompany?.name.short}
				</div>
				<FaPlus color='#23c3ab' size={20} onClick={onClick} />
			</div>
		)

	if (currentCompany)
		return (
			<>
				<div className={styles.dropDown__item}>
					<DropDownItem inn={currentCompany?.inn} name={currentCompany.name} />
					{isDropDownOpened ? (
						<FaChevronUp
							color='#23c3ab'
							size={20}
							onClick={toggleDropDown}
							style={{ cursor: 'pointer' }}
						/>
					) : (
						<FaChevronDown
							color='#23c3ab'
							size={20}
							onClick={toggleDropDown}
							style={{ cursor: 'pointer' }}
						/>
					)}
				</div>
				{isDropDownOpened && (
					<div>
						{data
							.filter(company => company.inn !== currentCompany.inn)
							.map(item => (
								<DropDownItem key={item.inn} inn={item.inn} name={item.name} />
							))}
						<AddBtn onClick={onClick} />
					</div>
				)}
			</>
		)
	return null
}
export default DropDown
