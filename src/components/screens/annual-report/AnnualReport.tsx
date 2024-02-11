import stepsMap from './steps/stepsMap'
import { useAnnualReport } from './useAnnualReport'
import { FC, useEffect, useState } from 'react'

import { Loader, Quiz } from '~/components/ui'

import styles from './AnnualReport.module.scss'

const AnnualReport: FC = () => {
	const [initialStepIndex, setInitialStepIndex] = useState(0)

	const {
		finalFunction,
		finalButtonTitle,
		currentAnnualReport,
		annualReportInitialDataSavedToDb,
		isLoading
	} = useAnnualReport()

	const firstStepDone =
		!!annualReportInitialDataSavedToDb ||
		(!!currentAnnualReport?.data?.accounts &&
			!!currentAnnualReport?.data?.operations &&
			!!currentAnnualReport?.data?.settings?.structure)

	const steps = stepsMap(currentAnnualReport, firstStepDone)

	useEffect(() => {
		if (firstStepDone) setInitialStepIndex(1)
	}, [firstStepDone])

	if (isLoading)
		return (
			<div className={styles.loader}>
				<Loader />
			</div>
		)

	return (
		<div className={styles.container}>
			<Quiz
				steps={steps}
				finalFunction={finalFunction}
				finalButtonTitle={finalButtonTitle}
				initialStepIndex={initialStepIndex}
			/>
		</div>
	)
}
export default AnnualReport
