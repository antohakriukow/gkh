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
				className={styles.supportIcon}
				color='#df4956'
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
