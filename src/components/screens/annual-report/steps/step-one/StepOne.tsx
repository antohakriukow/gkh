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
		setInitialCategories
	} = useStepOne()

	const steps = stepOneMap(
		annualState,
		handleSaveAnnualReportStructure,
		clearAccountsAndOperations,
		clearAccountTypes,
		setInitialCategories,
		clearError
	)

	const finalFunction = () => console.log('annualState: ', annualState)

	useEffect(() => {
		if (!currentAnnualReport?.data?.settings) return
		const settings = currentAnnualReport?.data?.settings

		if (settings.structure && settings.dataUploaded) {
			setInitialStep(2)
		} else if (settings.structure) {
			setInitialStep(1)
		} else {
			setInitialStep(0)
		}
	}, [currentAnnualReport?.data?.settings])

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div className={styles.container}>
					<MultiStep
						steps={steps}
						finalFunction={finalFunction}
						finalButtonTitle='Сохранить и перейти к шагу №2'
						initialStepIndex={initialStep}
					/>
				</div>
			)}
		</>
	)
}
export default StepOne
