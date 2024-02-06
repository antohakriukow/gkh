import stepOneMap from './stepOneMap'
import { useStepOne } from './useStepOne'
import { FC, useEffect, useState } from 'react'

import { Loader } from '~/components/ui'
import MultiStep from '~/components/ui/quiz-elements/multi-step/MultiStep'

import styles from './StepOne.module.scss'

const StepOne: FC = () => {
	const [initialStep, setInitialStep] = useState(0)

	const {
		handleSaveAnnualReportStructure,
		clearAccountsAndOperations,
		currentAnnualReport,
		annualState,
		isLoading,
		clearError,
		clearAccountTypes,
		setInitialCategories,
		saveReportData,
		setAnnualReportInitialDataSavedToDb
	} = useStepOne()

	const steps = stepOneMap(
		annualState,
		handleSaveAnnualReportStructure,
		clearAccountsAndOperations,
		clearAccountTypes,
		setInitialCategories,
		saveReportData,
		clearError,
		setAnnualReportInitialDataSavedToDb
	)

	const finalFunction = () => console.log('annualState: ', annualState)

	useEffect(() => {
		if (!currentAnnualReport?.data?.settings) return
		const settings = currentAnnualReport?.data?.settings
		const { operations } = currentAnnualReport?.data
		console.log('currentAnnualReport: ', currentAnnualReport)

		if (settings.structure && !!operations?.length) {
			settings.structure === 'cash/partners'
				? setInitialStep(3)
				: setInitialStep(4)
		} else if (settings.structure) {
			setInitialStep(1)
		} else {
			setInitialStep(0)
		}
	}, [currentAnnualReport])

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div className={styles.container}>
					<MultiStep
						steps={steps}
						finalFunction={finalFunction}
						finalButtonTitle='Сохранить'
						initialStepIndex={initialStep}
					/>
				</div>
			)}
		</>
	)
}
export default StepOne
