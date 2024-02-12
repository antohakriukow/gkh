import stepOneMap from './steps/step-one/stepOneMap'
import { useStepOne } from './steps/step-one/useStepOne'
import stepThreeMap from './steps/step-three/stepThreeMap'
import { useStepThree } from './steps/step-three/useStepThree'
import stepsMap from './steps/stepsMap'
import { FC, useEffect, useState } from 'react'

import { Quiz } from '~/components/ui'

import { IAnnualReport } from '~/shared/types/annual.interface'

import styles from './AnnualReport.module.scss'

const AnnualReport: FC = () => {
	const [initialStepIndex, setInitialStepIndex] = useState(0)

	const {
		handleSaveAnnualReportStructure,
		clearAccountsAndOperations,
		annualState,
		clearError,
		clearAccountTypes,
		setInitialCategories,
		saveReportData,
		setAnnualReportInitialDataSavedToDb,
		stepOneDone
	} = useStepOne()

	const { annualReportInDB } = useStepThree()

	const stepOne = stepOneMap(
		annualState,
		handleSaveAnnualReportStructure,
		clearAccountsAndOperations,
		clearAccountTypes,
		setInitialCategories,
		saveReportData,
		clearError,
		setAnnualReportInitialDataSavedToDb
	)

	const stepThree = stepThreeMap(annualReportInDB ?? ({} as IAnnualReport))

	const steps = stepsMap(annualReportInDB, stepOne, stepOneDone, stepThree)

	useEffect(() => {
		console.log('stepOneDone: ', stepOneDone)
		if (stepOneDone) setInitialStepIndex(1)
	}, [stepOneDone])

	return (
		<div className={styles.container}>
			<Quiz steps={steps} initialStepIndex={initialStepIndex} />
		</div>
	)
}
export default AnnualReport
