import cn from 'clsx'
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
				color='#4553a1'
				size={20}
				className={cn(styles.faq, 'faqButtonAnchor')}
				data-tooltip-id='faq'
				data-tooltip-content='Инструкции'
				data-tooltip-place='bottom'
			/>
			<Tooltip id='faq' delayShow={200} />
		</>
	)
}
export default FAQButton
