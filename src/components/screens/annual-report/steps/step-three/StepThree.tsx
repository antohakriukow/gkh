import BankIncomeOperations from './components/BankIncomeOperations'
import stepThreeMap from './stepThreeMap'
import { useStepThree } from './useStepThree'
import { FC } from 'react'

import MultiStep from '~/components/ui/quiz-elements/multi-step/MultiStep'

import styles from './StepThree.module.scss'

const StepThree: FC = () => {
	const { annualReportInDB } = useStepThree()

	if (!annualReportInDB) return null

	const steps = stepThreeMap(annualReportInDB)

	return (
		<div className={styles.container}>
			{/* <BankIncomeOperations /> */}
			<MultiStep
				steps={steps}
				finalFunction={() => {}}
				finalButtonTitle='Сохранить'
			/>
		</div>
	)
}
export default StepThree
