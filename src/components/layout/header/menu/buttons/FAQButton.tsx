import { FC } from 'react'
import { FaQuestionCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

import styles from './buttons.module.scss'

const FAQButton: FC = () => {
	const navigate = useNavigate()

	const handlePress = () => navigate('/faq')

	return (
		<FaQuestionCircle
			onClick={handlePress}
			color='#df4956'
			size={20}
			className={styles.faq}
		/>
	)
}
export default FAQButton
