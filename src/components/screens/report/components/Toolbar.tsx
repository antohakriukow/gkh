import ReportButtons from './ReportButtons'
import { FC } from 'react'
import { SubmitHandler, UseFormHandleSubmit } from 'react-hook-form'

import SubHeader from '~/components/ui/sub-header/SubHeader'

import { IReport } from '~/shared/types/report.interface'

interface IToolbarProps {
	title: string
	handleCloseReport: () => void
	isReadyToGenerate: boolean
	isReadyToDownload: boolean
	handleSubmit: UseFormHandleSubmit<IReport, undefined>
	handleShowCheckReportModal: () => void
	saveReport: SubmitHandler<IReport>
	downloadReportPDF: () => Promise<void>
	downloadReportXML: () => Promise<void>
}

const Toolbar: FC<IToolbarProps> = ({
	title,
	handleCloseReport,
	isReadyToGenerate,
	isReadyToDownload,
	handleShowCheckReportModal,
	handleSubmit,
	saveReport,
	downloadReportPDF,
	downloadReportXML
}) => {
	const showSaveButton = !isReadyToGenerate
	const showGenerateButton = isReadyToGenerate && !isReadyToDownload
	const showDownloadButtons = isReadyToGenerate && isReadyToDownload

	return (
		<SubHeader title={title}>
			<ReportButtons
				showSaveButton={showSaveButton}
				showGenerateButton={showGenerateButton}
				showDownloadButtons={showDownloadButtons}
				handleSubmit={handleSubmit}
				saveReport={saveReport}
				handleShowReportConfirmationModal={handleShowCheckReportModal}
				downloadReportPDF={downloadReportPDF}
				downloadReportXML={downloadReportXML}
				handleCloseReport={handleCloseReport}
			/>
		</SubHeader>
	)
}
export default Toolbar
