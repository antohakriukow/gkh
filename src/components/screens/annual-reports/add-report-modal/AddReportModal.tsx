import { FC, Fragment } from 'react'

import { useAddReportModal } from '~/components/screens/annual-reports/add-report-modal/useAddReportModal'
import { Button, Loader } from '~/components/ui'

import styles from './AddReportModal.module.scss'

interface IReportModalProps {
	handleOpenReport: (reportId: string) => void
}

const ReportModal: FC<IReportModalProps> = ({ handleOpenReport }) => {
	const {
		isLoading,
		currentCompanyName,
		handleCreateReport,

		DO_YOU_WANT_TO_CREATE_ANNUAL,
		CREATE
	} = useAddReportModal(handleOpenReport)

	return (
		<div className={styles.container}>
			{isLoading ? (
				<Loader loaderType='small' />
			) : (
				<Fragment>
					<h3 className={styles.title}>{currentCompanyName}</h3>
					<p className={styles.reportSubtitle}>
						{DO_YOU_WANT_TO_CREATE_ANNUAL}
					</p>
					<Button onClick={handleCreateReport} style={{ marginTop: 20 }}>
						{CREATE}
					</Button>
				</Fragment>
			)}
		</div>
	)
}
export default ReportModal
