import ReportDeleteModal from './report-delete-modal/ReportDeleteModal'
import { FC } from 'react'
import { useModal } from '~/hooks'

import { Button } from '~/components/ui'
import SubHeader from '~/components/ui/sub-header/SubHeader'

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

	const title = 'Отчет об исполнении сметы'
	const DELETE = 'Удалить'
	const CLOSE = 'Закрыть'

	return (
		<SubHeader title={title}>
			{!isReportPayed && (
				<Button color='danger' onClick={handleShowReportDeleteModal}>
					{DELETE}
				</Button>
			)}
			<Button onClick={handleCloseReport}>{CLOSE}</Button>
		</SubHeader>
	)
}
export default Toolbar
