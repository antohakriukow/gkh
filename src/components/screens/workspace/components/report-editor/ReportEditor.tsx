import ReportForm from './22gkh/ReportForm'
import { useReportEditor } from './useReportEditor'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineCloseCircle } from 'react-icons/ai'

import { Button, Heading } from '~/components/ui'

import { IReport } from '~/shared/types/report.interface'

import styles from './ReportEditor.module.scss'

const ReportEditor: FC = () => {
	const { register, setValue, control, formState, watch, reset, handleSubmit } =
		useForm<IReport>({
			mode: 'onSubmit'
		})

	const {
		reportEditorHeading,
		onSubmit,
		generateReport,
		downloadReportXML,
		downloadReportPDF,
		currentReport,
		closeReport
	} = useReportEditor(setValue, reset)

	const isReadyToGenerate = !formState.isDirty
	const isReadyToDownload =
		currentReport?.finalReport?.generatedAt &&
		currentReport?.finalReport?.generatedAt >= currentReport?.updatedAt

	return (
		<div>
			<div className={styles.header}>
				<Heading title={reportEditorHeading} className={styles.title} />
				<AiOutlineCloseCircle onClick={closeReport} color='#df4956' size={32} />
			</div>
			<ReportForm
				register={register}
				control={control}
				formState={formState}
				watch={watch}
				setValue={setValue}
			/>
			{!isReadyToGenerate && (
				<Button onClick={handleSubmit(onSubmit)} className={styles.button}>
					Сохранить
				</Button>
			)}
			{isReadyToGenerate && (
				<>
					{!isReadyToDownload && (
						<Button onClick={generateReport} className={styles.button}>
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

export default ReportEditor
