import stepOneMap from './stepOneMap'
import { useStepOne } from './useStepOne'
import { FC } from 'react'
import { useForm } from 'react-hook-form'

import MultiStep from '~/components/ui/quiz-elements/multi-step/MultiStep'

import { IAnnualReportSettings } from '~/shared/types/annual.interface'

import styles from './StepOne.module.scss'

const StepOne: FC = () => {
	const { setValue, control, getValues, formState } =
		useForm<IAnnualReportSettings>({
			mode: 'onSubmit'
		})
	const { handleSubmit } = useStepOne(setValue)

	const steps = stepOneMap(handleSubmit, control, getValues, formState)

	const finalFunction = () => console.log('Function before step 2')
	return (
		<div className={styles.container}>
			<MultiStep
				steps={steps}
				finalFunction={finalFunction}
				finalButtonTitle='Завершить'
			/>
		</div>
	)
}
export default StepOne
