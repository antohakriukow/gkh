import { FC } from 'react'
import { useModal } from '~/hooks'

import { Button } from '~/components/ui'

import ConfirmGenerationModal from '../../confirm-report-generation-module/ConfirmGenerationModal'
import styles from '../CheckReportModal.module.scss'

interface IButtons {
	generateReport: () => void
	isDanger: boolean
}

const Buttons: FC<IButtons> = ({ generateReport, isDanger }) => {
	const { showModal, hideModal } = useModal()

	const handleShowReportConfirmationModal = () => {
		showModal(<ConfirmGenerationModal generateReport={generateReport} />)
	}

	return (
		<div className={styles.buttons}>
			<Button
				onClick={handleShowReportConfirmationModal}
				className={styles.button}
				color={isDanger ? 'danger' : 'success'}
			>
				Продолжить
			</Button>
			<Button onClick={hideModal} className={styles.button}>
				Внести правки
			</Button>
		</div>
	)
}
export default Buttons
