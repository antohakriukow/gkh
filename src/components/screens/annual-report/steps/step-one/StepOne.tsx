import stepOneMap from './stepOneMap'
import { useStepOne } from './useStepOne'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Loader } from '~/components/ui'
import MultiStep from '~/components/ui/quiz-elements/multi-step/MultiStep'

import { IAnnualReport } from '~/shared/types/annual.interface'

import styles from './StepOne.module.scss'

const StepOne: FC = () => {
	const [initialStep, setInitialStep] = useState(0)
	const { setValue, control, getValues, formState, reset, register, watch } =
		useForm<IAnnualReport>({
			mode: 'onSubmit'
		})
	const { isLoading, handleSubmit, currentAnnualReport } = useStepOne(
		setValue,
		reset
	)

	const steps = stepOneMap(
		handleSubmit,
		control,
		getValues,
		register,
		formState,
		setValue,
		watch
	)

	const finalFunction = () => console.log('Function before step 2')

	useEffect(() => {
		if (!currentAnnualReport?.data.settings) return
		const settings = currentAnnualReport?.data?.settings
		if (!!settings?.structure && !!settings?.dataUploaded)
			return setInitialStep(2)
		if (!!settings?.structure) return setInitialStep(1)
		setInitialStep(0)
	}, [currentAnnualReport?.data?.settings])

	return (
		<>
			{isLoading ? (
				<div className={styles.loaderContainer}>
					<Loader loaderType='large' />
				</div>
			) : (
				<div className={styles.container}>
					<MultiStep
						steps={steps}
						finalFunction={finalFunction}
						finalButtonTitle='Завершить'
						initialStepIndex={initialStep}
					/>
				</div>
			)}
		</>
	)
}
export default StepOne
