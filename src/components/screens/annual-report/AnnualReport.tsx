import stepsMap from './steps/stepsMap'
import { useAnnualReport } from './useAnnualReport'
import { FC, useEffect, useState } from 'react'

import { Quiz } from '~/components/ui'

import styles from './AnnualReport.module.scss'

const AnnualReport: FC = () => {
	const { finalFunction, finalButtonTitle, currentAnnualReport } =
		useAnnualReport()
	const [isNextButtonHiddenOnStepOne, setIsNextButtonHiddenOnStepOne] =
		useState(true)
	const hasSettings = !!currentAnnualReport?.data?.settings
	const hasOperations = !!currentAnnualReport?.data?.operations
	const hasAccounts = !!currentAnnualReport?.data?.accounts

	console.log('hasSettings: ', hasSettings)
	console.log('hasOperations: ', hasOperations)
	console.log('hasAccounts: ', hasAccounts)

	useEffect(() => {
		setIsNextButtonHiddenOnStepOne(
			!(hasSettings && hasOperations && hasAccounts)
		)
	}, [hasSettings, hasOperations, hasAccounts])

	const steps = stepsMap(currentAnnualReport, isNextButtonHiddenOnStepOne)

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
