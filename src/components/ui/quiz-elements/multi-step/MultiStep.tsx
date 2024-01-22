import { FC, useState } from 'react'

import Button from '../../form-elements/Button'
import { IQuizProps } from '../quiz.interface'

import styles from './MultiStep.module.scss'

const MultiStep: FC<IQuizProps> = ({
	steps,
	finalButtonTitle,
	initialStepIndex = 0
}) => {
	const [currentStepIndex, setCurrentStepIndex] = useState(initialStepIndex)

	const currentStep = steps[currentStepIndex]
	const isLastStep = currentStepIndex === steps.length - 1

	const goToPreviousStep = () => {
		if (currentStepIndex > 0) {
			setCurrentStepIndex(currentStepIndex - 1)
		}
	}

	const goToNextStep = () => {
		if (currentStep.onNext) {
			currentStep.onNext()
		}

		if (currentStepIndex < steps.length - 1) {
			setCurrentStepIndex(currentStepIndex + 1)
		}
	}

	const buttonText = isLastStep
		? finalButtonTitle
			? finalButtonTitle
			: 'Завершить'
		: currentStep.onNextButtonTitle
		? currentStep.onNextButtonTitle
		: 'Далее'

	return (
		<div className={styles.container}>
			{steps.map(
				(step, index) =>
					index <= currentStepIndex && (
						<div key={index} className={styles.step}>
							{step.component}
							{index === currentStepIndex && (
								<>
									{currentStepIndex > 0 && (
										<Button onClick={goToPreviousStep}>Назад</Button>
									)}
									{!currentStep.hidden && (
										<Button onClick={goToNextStep}>{buttonText}</Button>
									)}
								</>
							)}
							{index < currentStepIndex && <div className={styles.overlay} />}
						</div>
					)
			)}
		</div>
	)
}

export default MultiStep
