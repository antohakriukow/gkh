import Buttons from './components/Buttons'
import Notice from './components/Notice'
import Results from './components/Results'
import { useCheckReportModal } from './useCheckReportModal'
import { FC } from 'react'

import { Loader } from '~/components/ui'

import { ICheckReportResult } from '~/shared/types/report.interface'

import styles from './CheckReportModal.module.scss'

interface ICheckReportModal {
	checkReport: () => Promise<ICheckReportResult[] | undefined>
	generateReport: () => void
}

const CheckReportModal: FC<ICheckReportModal> = ({
	checkReport,
	generateReport
}) => {
	const { checkResults, errors, warnings, isDanger } =
		useCheckReportModal(checkReport)
	const LOGIC_CONTROL_PROTOCOL = 'Протокол логического контроля'

	if (checkResults === null) return <Loader loaderType='small' />

	return (
		<div>
			<h2 className={styles.title}>{LOGIC_CONTROL_PROTOCOL}</h2>
			<Results type='error' data={errors} />
			<Results type='warning' data={warnings} />
			<Notice warnings={warnings} errors={errors} />
			<Buttons generateReport={generateReport} isDanger={isDanger} />
		</div>
	)
}
export default CheckReportModal
