import { FC } from 'react'
import { BsHouseAddFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

import { useModal } from '~/hooks/useModal'

import AddCompanyModal from '../../../../../screens/reports/modals/add-company-modal/AddCompanyModal'
import styles from '../../HeaderMenu.module.scss'

const AddCompanyButton: FC<{ onClick?: () => void }> = ({ onClick }) => {
	const navigate = useNavigate()
	const { showModal } = useModal()

	const goHome = () => navigate(`/reports`)

	const handleAdd = () => {
		if (!!onClick) onClick()
		goHome()
		showModal(<AddCompanyModal />)
	}

	return (
		<div onClick={handleAdd} className={styles.button}>
			<BsHouseAddFill
				color='#df4956'
				size={20}
				style={{ cursor: 'pointer', userSelect: 'none' }}
			/>
			<p className={styles.buttonTitle}>Добавить компанию</p>
		</div>
	)
}
export default AddCompanyButton
