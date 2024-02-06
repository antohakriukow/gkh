import stepsMap from './steps/stepsMap'
import { useAnnualReport } from './useAnnualReport'
import { FC, useEffect, useState } from 'react'

import { Quiz } from '~/components/ui'

import styles from './AnnualReport.module.scss'

const AnnualReport: FC = () => {
	const {
		finalFunction,
		finalButtonTitle,
		currentAnnualReport,
		annualReportInitialDataSavedToDb
	} = useAnnualReport()

	const steps = stepsMap(currentAnnualReport, annualReportInitialDataSavedToDb)

	return (
		<div className={styles.container}>
			<Quiz
				steps={steps}
				finalFunction={finalFunction}
				finalButtonTitle={finalButtonTitle}
			/>
		</div>
	)
}
export default AnnualReport
