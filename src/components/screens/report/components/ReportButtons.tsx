import { FC } from 'react'
import { SubmitHandler, UseFormHandleSubmit } from 'react-hook-form'
import { useWindowWidth } from '~/hooks'

import { Button } from '~/components/ui'

import { IReport } from '~/shared/types/report.interface'

interface IReportButtons {
	showSaveButton: boolean
	showGenerateButton: boolean
	showDownloadButtons: boolean
	handleSubmit: UseFormHandleSubmit<IReport, undefined>
	saveReport: SubmitHandler<IReport>
	handleShowReportConfirmationModal: () => void
	downloadReportPDF: () => Promise<void>
	downloadReportXML: () => Promise<void>
	handleCloseReport: () => void
}

const ReportButtons: FC<IReportButtons> = ({
	showSaveButton,
	showGenerateButton,
	showDownloadButtons,
	handleSubmit,
	saveReport,
	handleShowReportConfirmationModal,
	downloadReportPDF,
	downloadReportXML,
	handleCloseReport
}) => {
	const { width } = useWindowWidth()
	const isNarrow = width < 750

	const SAVE = 'Сохранить'
	const GENERATE_REPORT = isNarrow ? 'Сформировать' : 'Сформировать отчет'
	const DOWNLOAD_PDF = isNarrow ? 'PDF' : 'Скачать PDF'
	const DOWNLOAD_XML = isNarrow ? 'XML' : 'Скачать XML'
	const CLOSE = 'Закрыть'

	return (
		<div>
			{showSaveButton && (
				<Button title={SAVE} onClick={handleSubmit(saveReport)} />
			)}
			{showGenerateButton && (
				<Button
					title={GENERATE_REPORT}
					onClick={handleShowReportConfirmationModal}
				/>
			)}
			{showDownloadButtons && (
				<>
					<Button title={DOWNLOAD_PDF} onClick={downloadReportPDF} />
					<Button title={DOWNLOAD_XML} onClick={downloadReportXML} />
				</>
			)}
			<Button onClick={handleCloseReport}>{CLOSE}</Button>
		</div>
	)
}
export default ReportButtons
