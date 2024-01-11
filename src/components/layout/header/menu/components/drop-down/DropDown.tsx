import DropDownItem from './DropDownItem'
import { IDropDown } from './drop-down.interface'
import { FC, useEffect, useRef, useState } from 'react'
import { MdOutlineMenu } from 'react-icons/md'

import { Loader } from '~/components/ui'

import { ICompany } from '~/shared/types/company.interface'

import { useHeader } from '../../../useHeader'
import AddCompanyButton from '../buttons/AddCompanyButton'
import LogoutButton from '../buttons/LogoutButton'
import ProfileButton from '../buttons/ProfileButton'

import styles from './DropDown.module.scss'

const DropDown: FC<IDropDown> = ({ data }) => {
	const [isDropDownOpened, setIsDropDownOpened] = useState(false)
	const { isDataLoading, handleSetCurrentCompany, currentCompany } = useHeader()
	const dropDownRef = useRef<HTMLDivElement>(null)

	const toggleDropDown = () => setIsDropDownOpened(!isDropDownOpened)
	const handleClickOnItem = (inn: number) => {
		handleSetCurrentCompany(inn)
		toggleDropDown()
	}

	const renderDropDownItem = (company: ICompany, noHover: boolean = false) => (
		<DropDownItem
			onClick={() => handleClickOnItem(company.inn)}
			key={company.inn}
			inn={company.inn}
			name={company.name}
			noHover={noHover}
		/>
	)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropDownRef.current &&
				!dropDownRef.current.contains(event.target as Node)
			) {
				setIsDropDownOpened(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [dropDownRef])

	if (isDataLoading) return <Loader />

	return (
		<div ref={dropDownRef} className={styles.anchor}>
			<div className={styles.dropDown}>
				<div onClick={toggleDropDown} className={styles.iconContainer}>
					<MdOutlineMenu
						className='menuButtonAnchor'
						color='#4553a1'
						size={30}
					/>
				</div>
				{/* {currentCompany && renderDropDownItem(currentCompany, true)} */}

				{isDropDownOpened && (
					<div className={styles.menu}>
						{currentCompany && renderDropDownItem(currentCompany, true)}
						{data
							.filter(company => company.inn !== currentCompany?.inn)
							.map(company => renderDropDownItem(company))}
						<AddCompanyButton onClick={toggleDropDown} />
						<ProfileButton />
						<LogoutButton />
					</div>
				)}
			</div>
		</div>
	)
}

export default DropDown
