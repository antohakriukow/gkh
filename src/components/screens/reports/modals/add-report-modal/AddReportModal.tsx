import { useAddReportModal } from './useAddReportModal'
import { FC } from 'react'

import { Button } from '~/components/ui'

import styles from './add-report-modal.module.scss'

const AddReportModal: FC<{ handleOpenReport: (_id: string) => void }> = ({
	handleOpenReport
}) => {
	const {
		isReportExisting,
		reportIsExistingNotification,
		periodTitle,
		companyName,
		handleGoToReport,
		handleCreate,

		GO,
		GO_TO_REPORT,
		REPORT_TITLE,
		CREATE_REPORT
	} = useAddReportModal(handleOpenReport)

	if (isReportExisting) {
		return (
			<div className={styles.container}>
				<h3 className={styles.title}>{reportIsExistingNotification}</h3>
				<p className={styles.reportSubtitle}>{GO_TO_REPORT}</p>
				<Button
					title={GO}
					onClick={handleGoToReport}
					style={{ marginTop: 8, width: '100%' }}
				/>
			</div>
		)
	}

	return (
		<div className={styles.container}>
			<h3 className={styles.title}>{companyName}</h3>
			<p className={styles.reportSubtitle}>{REPORT_TITLE}</p>
			<p className={styles.periodSubtitle}>{periodTitle}</p>
			<Button
				title={CREATE_REPORT}
				onClick={handleCreate}
				style={{ marginTop: 12 }}
			/>
		</div>
	)
}
export default AddReportModal
