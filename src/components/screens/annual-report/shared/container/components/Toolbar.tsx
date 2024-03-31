import ReportDeleteModal from './report-delete-modal/ReportDeleteModal'
import { FC } from 'react'
import { useModal } from '~/hooks'

import { Button, SubHeading } from '~/components/ui'

import styles from './toolbar.module.scss'

interface IToolbarProps {
	isReportPayed: boolean
	handleCloseReport: () => void
	handleDeleteReport: () => void
}

const Toolbar: FC<IToolbarProps> = ({
	isReportPayed,
	handleCloseReport,
	handleDeleteReport
}) => {
	const { showModal } = useModal()
	const handleShowReportDeleteModal = () => {
		showModal(<ReportDeleteModal deleteAnnualReport={handleDeleteReport} />)
	}

	return (
		<div className={styles.container}>
			<SubHeading title='Отчет об исполнении сметы' />
			<div>
				{!isReportPayed && (
					<Button color='danger' onClick={handleShowReportDeleteModal}>
						Удалить
					</Button>
				)}
				<Button onClick={handleCloseReport}>Закрыть</Button>
			</div>
		</div>
	)
}
export default Toolbar
