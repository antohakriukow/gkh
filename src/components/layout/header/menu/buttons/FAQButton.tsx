import { FC } from 'react'
import { FaQuestionCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'

import styles from './buttons.module.scss'

const FAQButton: FC = () => {
	const navigate = useNavigate()

	const handlePress = () => navigate('/faq')

	return (
		<>
			<FaQuestionCircle
				onClick={handlePress}
				color='#df4956'
				size={20}
				className={styles.faq}
				data-tooltip-id='faq'
				data-tooltip-content='Инструкции'
				data-tooltip-place='bottom'
			/>
			<Tooltip id='faq' delayShow={200} />
		</>
	)
}
export default FAQButton
