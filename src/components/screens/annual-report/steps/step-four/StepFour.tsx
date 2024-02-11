import stepThreeMap from './stepFourMap'
import { useStepFour } from './useStepFour'
import { FC } from 'react'

import MultiStep from '~/components/ui/quiz-elements/multi-step/MultiStep'

import styles from './StepThree.module.scss'

const StepThree: FC = () => {
	const { annualReportInDB } = useStepFour()

	if (!annualReportInDB) return null

	const steps = stepThreeMap(annualReportInDB)

	return (
		<div className={styles.container}>
			<MultiStep
				steps={steps}
				finalFunction={() => {}}
				finalButtonTitle='Сохранить'
			/>
		</div>
	)
}
export default StepThree
