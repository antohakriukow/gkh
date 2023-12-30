import Buttons from './components/Buttons'
import Notice from './components/Notice'
import Results from './components/Results'
import { FC, useEffect, useState } from 'react'

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
	const [checkResults, setCheckResults] = useState<ICheckReportResult[] | null>(
		null
	)

	const warnings = checkResults
		? checkResults.filter(result => result.type === 'warning')
		: []
	const errors = checkResults
		? checkResults.filter(result => result.type === 'error')
		: []

	useEffect(() => {
		checkReport().then(data => setCheckResults(data ?? []))
	}, [checkReport])

	return checkResults === null ? (
		<Loader loaderType='large' />
	) : (
		<div>
			<h2 className={styles.title}>Протокол логического контроля</h2>
			<Results type='error' data={errors} />
			<Results type='warning' data={warnings} />
			<Notice warnings={warnings} errors={errors} />
			<Buttons
				generateReport={generateReport}
				isDanger={!!errors || (!!warnings && warnings.length > 3)}
			/>
		</div>
	)
}
export default CheckReportModal
