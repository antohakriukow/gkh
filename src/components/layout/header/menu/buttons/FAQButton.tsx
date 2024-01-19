import cn from 'clsx'
import { FC } from 'react'
import { FaQuestionCircle } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'

import styles from './buttons.module.scss'

const FAQButton: FC = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const currentPath = location.pathname

	const handlePress = () => {
		if (currentPath.includes('/reports/edit/')) {
			window.open('/faq', '_blank')
		} else {
			navigate('/faq')
		}
	}

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
