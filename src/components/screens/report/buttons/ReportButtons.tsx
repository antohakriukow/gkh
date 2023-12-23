import { FC } from 'react'
import { SubmitHandler, UseFormHandleSubmit } from 'react-hook-form'

import { Button } from '~/components/ui'

import { IReport } from '~/shared/types/report.interface'

import styles from './ReportButtons.module.scss'

interface IReportButtons {
	isReadyToGenerate: boolean
	isReadyToDownload: boolean | '' | undefined
	handleSubmit: UseFormHandleSubmit<IReport, undefined>
	saveReport: SubmitHandler<IReport>
	handleShowReportConfirmationModal: () => void
	downloadReportPDF: () => Promise<void>
	downloadReportXML: () => Promise<void>
}

const ReportButtons: FC<IReportButtons> = ({
	isReadyToGenerate,
	isReadyToDownload,
	handleSubmit,
	saveReport,
	handleShowReportConfirmationModal,
	downloadReportPDF,
	downloadReportXML
}) => {
	return (
		<div className={styles.buttons}>
			{!isReadyToGenerate && (
				<Button onClick={handleSubmit(saveReport)} className={styles.button}>
					Сохранить
				</Button>
			)}
			{isReadyToGenerate && (
				<>
					{!isReadyToDownload && (
						<Button
							onClick={handleShowReportConfirmationModal}
							className={styles.button}
						>
							Сгенерировать отчет
						</Button>
					)}
					{isReadyToDownload && (
						<>
							<Button onClick={downloadReportPDF} className={styles.button}>
								Скачать PDF
							</Button>
							<Button onClick={downloadReportXML} className={styles.button}>
								Скачать XML
							</Button>
						</>
					)}
				</>
			)}
		</div>
	)
}
export default ReportButtons
