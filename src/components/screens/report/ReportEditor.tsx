import ReportForm from './22gkh/ReportForm'
import NoReportFound from './components/NoReportFound'
import Toolbar from './components/Toolbar'
import CheckReportModal from './modals/check-report-modal/CheckReportModal'
import { useReportEditor } from './useReportEditor'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useModal } from '~/hooks'

import { Loader } from '~/components/ui'

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
		isReportNotExists,
		isReadyToGenerate,
		isReadyToDownload,
		reportId,
		reportEditorHeading,
		saveReport,
		checkReport,
		generateReport,
		downloadReportPDF,
		downloadReportXML,
		closeReport
	} = useReportEditor(setValue, reset, formState)

	if (isReportNotExists) return <NoReportFound />

	const handleShowCheckReportModal = () => {
		if (!!reportId && checkReport() !== undefined)
			showModal(
				<CheckReportModal
					checkReport={checkReport}
					generateReport={generateReport}
				/>
			)
	}

	if (isLoading) return <Loader loaderType='fullscreen' />

	return (
		<div className={styles.container} key={reportId}>
			<Toolbar
				title={reportEditorHeading}
				handleCloseReport={closeReport}
				isReadyToGenerate={isReadyToGenerate}
				isReadyToDownload={isReadyToDownload}
				handleSubmit={handleSubmit}
				handleShowCheckReportModal={handleShowCheckReportModal}
				saveReport={saveReport}
				downloadReportPDF={downloadReportPDF}
				downloadReportXML={downloadReportXML}
			/>

			<div className={styles.report}>
				<ReportForm
					register={register}
					control={control}
					formState={formState}
					watch={watch}
					setValue={setValue}
				/>
			</div>
		</div>
	)
}
export default ReportEditor
