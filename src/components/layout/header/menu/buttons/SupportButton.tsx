import cn from 'clsx'
import { FC } from 'react'
import { IoMailSharp } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'

import styles from './buttons.module.scss'

const SupportButton: FC = () => {
	const navigate = useNavigate()

	const navigateToIssues = () => {
		navigate(`/issues`)
	}

	return (
		<>
			<IoMailSharp
				className={cn(styles.supportIcon, 'supportButtonAnchor')}
				color='#4553a1'
				size={26}
				onClick={navigateToIssues}
				data-tooltip-id='support'
				data-tooltip-content='Техподдержка'
				data-tooltip-place='bottom'
			/>
			<Tooltip id='support' delayShow={200} />
		</>
	)
}
export default SupportButton
