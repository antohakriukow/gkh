import ReportForm from './22gkh/ReportForm'
import ConfirmGenerationModal from './modals/confirm-report-generation-module/ConfirmGenerationModal'
import { useReportEditor } from './useReportEditor'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineCloseCircle } from 'react-icons/ai'

import { Button, Heading, Loader } from '~/components/ui'

import { useModal } from '~/hooks/useModal'

import { IReport } from '~/shared/types/report.interface'

import styles from './ReportEditor.module.scss'

const ReportEditor: FC = () => {
	const { register, setValue, control, formState, watch, reset, handleSubmit } =
		useForm<IReport>({
			mode: 'onSubmit'
		})
	const { showModal } = useModal()

	const {
		isLoading,
		reportEditorHeading,
		saveReport,
		currentReport,
		downloadReportXML,
		downloadReportPDF,
		generateReport,
		closeReport
	} = useReportEditor(setValue, reset)

	const isReadyToGenerate = !formState.isDirty && formState.isValid
	const isReadyToDownload =
		currentReport?.finalReport?.generatedAt &&
		currentReport?.finalReport?.generatedAt >= currentReport?.updatedAt

	const handleShowReportConfirmationModal = () => {
		showModal(<ConfirmGenerationModal generateReport={generateReport} />)
	}

	if (isLoading)
		return (
			<div className={styles.container}>
				<Loader loaderType='large' />
			</div>
		)

	return (
		<div className={styles.container}>
			<div className={styles.report}>
				<div className={styles.header}>
					<Heading title={reportEditorHeading} className={styles.title} />
					<AiOutlineCloseCircle
						onClick={closeReport}
						color='#df4956'
						size={32}
					/>
				</div>
				<ReportForm
					register={register}
					control={control}
					formState={formState}
					watch={watch}
					setValue={setValue}
				/>
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
		</div>
	)
}

export default ReportEditor
