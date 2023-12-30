import ReportForm from './22gkh/ReportForm'
import ReportButtons from './buttons/ReportButtons'
import NoReportFound from './components/NoReportFound'
import CheckReportModal from './modals/check-report-modal/CheckReportModal'
import { useReportEditor } from './useReportEditor'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineCloseSquare } from 'react-icons/ai'
import { useParams } from 'react-router-dom'

import { Heading, Loader } from '~/components/ui'

import { useData } from '~/hooks/useData'
import { useModal } from '~/hooks/useModal'

import { IReport } from '~/shared/types/report.interface'

import styles from './ReportEditor.module.scss'

const ReportEditor: FC = () => {
	const [isLoading, setIsLoading] = useState(true)
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
		checkReport,
		generateReport,
		closeReport
	} = useReportEditor(setValue, reset)

	const { reportId } = useParams()
	const { reports, isLoading: isDataLoading } = useData()

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false)
		}, 1000)

		return () => clearTimeout(timer)
	}, [])

	if (isLoading)
		return (
			<div className={styles.container}>
				<Loader loaderType='large' />
			</div>
		)

	const reportExists = reports.some(
		report => report?._id?.toString() === reportId?.toString()
	)

	if (!reportExists) return <NoReportFound />

	const isReadyToGenerate = !formState.isDirty && formState.isValid
	const isReadyToDownload =
		currentReport?.finalReport?.generatedAt &&
		currentReport?.finalReport?.generatedAt >= currentReport?.updatedAt

	const handleShowCheckReportModal = () => {
		if (!!reportId && checkReport() !== undefined)
			showModal(
				<CheckReportModal
					checkReport={checkReport}
					generateReport={generateReport}
				/>
			)
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
				handleShowReportConfirmationModal={handleShowCheckReportModal}
				downloadReportPDF={downloadReportPDF}
				downloadReportXML={downloadReportXML}
			/>
			{isDataLoading ? (
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
