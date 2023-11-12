import DropDownItem from './DropDownItem'
import { IDropDown } from './drop-down.interface'
import { FC, useState } from 'react'
import { FaChevronDown, FaChevronUp, FaPlus } from 'react-icons/fa'

import AddCompanyBtn from '../AddCompanyBtn'
import { useCompany } from '../useCompany'

import styles from './DropDown.module.scss'

const DropDown: FC<IDropDown> = ({ data, onClick }) => {
	const [isDropDownOpened, setIsDropDownOpened] = useState(false)
	const { handleSetCurrentCompany, currentCompany } = useCompany()

	const toggleDropDown = () => setIsDropDownOpened(!isDropDownOpened)

	const handleClick = (inn: number) => {
		handleSetCurrentCompany(inn)
		setIsDropDownOpened(false)
	}

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
			<div className={styles.dropDown}>
				<div className={styles.dropDown__first}>
					<DropDownItem
						onClick={inn => handleClick(inn)}
						inn={currentCompany?.inn}
						name={currentCompany.name}
					/>
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
					<>
						{data
							.filter(company => company.inn !== currentCompany.inn)
							.map(item => (
								<DropDownItem
									onClick={inn => handleClick(inn)}
									key={item.inn}
									inn={item.inn}
									name={item.name}
								/>
							))}
						<div className={styles.dropDown__btnDecorator}>
							<AddCompanyBtn onClick={onClick} />
						</div>
					</>
				)}
			</div>
		)
	return null
}
export default DropDown
