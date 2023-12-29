import ReportForm from './22gkh/ReportForm'
import ReportButtons from './buttons/ReportButtons'
import NoReportFound from './components/NoReportFound'
import ConfirmGenerationModal from './modals/confirm-report-generation-module/ConfirmGenerationModal'
import { useReportEditor } from './useReportEditor'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineCloseSquare } from 'react-icons/ai'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import { Button, Heading, Loader } from '~/components/ui'

import { useData } from '~/hooks/useData'
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
		reportEditorHeading,
		saveReport,
		currentReport,
		downloadReportXML,
		downloadReportPDF,
		generateReport,
		closeReport
	} = useReportEditor(setValue, reset)

	const { reportId } = useParams()
	const { reports, isLoading } = useData()

	if (isLoading) return <Loader loaderType='large' />

	const reportExists = reports.some(
		report => report?._id?.toString() === reportId?.toString()
	)

	if (!reportExists) return <NoReportFound />

	const isReadyToGenerate = !formState.isDirty && formState.isValid
	const isReadyToDownload =
		currentReport?.finalReport?.generatedAt &&
		currentReport?.finalReport?.generatedAt >= currentReport?.updatedAt

	const handleShowReportConfirmationModal = () => {
		showModal(<ConfirmGenerationModal generateReport={generateReport} />)
	}

	return (
		<div className={styles.container} key={reportId}>
			<div className={styles.header}>
				<Heading title={reportEditorHeading} className={styles.title} />
				<AiOutlineCloseSquare onClick={closeReport} color='#df4956' size={40} />
			</div>
			<ReportButtons
				isReadyToGenerate={isReadyToGenerate}
				isReadyToDownload={isReadyToDownload}
				handleSubmit={handleSubmit}
				saveReport={saveReport}
				handleShowReportConfirmationModal={handleShowReportConfirmationModal}
				downloadReportPDF={downloadReportPDF}
				downloadReportXML={downloadReportXML}
			/>
			{isLoading ? (
				<Loader loaderType='large' />
			) : (
				<>
					<div className={styles.report}>
						<ReportForm
							register={register}
							control={control}
							formState={formState}
							watch={watch}
							setValue={setValue}
						/>
					</div>
				</>
			)}
		</div>
	)
}
export default ReportEditor
