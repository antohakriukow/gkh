import React, { useState } from 'react'

import Button from '../../form-elements/Button'
import { IQuizProps } from '../quiz.interface'

import styles from './quiz.module.scss'

const Quiz: React.FC<IQuizProps> = ({
	steps,
	finalFunction,
	finalButtonTitle,
	initialStepIndex = 0
}) => {
	const [currentStepIndex, setCurrentStepIndex] = useState(initialStepIndex)

	const currentStep = steps[currentStepIndex]
	const isLastStep = currentStepIndex === steps.length - 1

	const goToPreviousStep = () => {
		if (currentStepIndex > 0) {
			if (!!currentStep.onPrevious) currentStep.onPrevious()
			setCurrentStepIndex(currentStepIndex - 1)
		}
	}

	const goToNextStep = () => {
		if (!isLastStep) {
			currentStep.onNext()
			setCurrentStepIndex(currentStepIndex + 1)
		} else {
			finalFunction()
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
			<div>
				<div className={styles.stepIndicator}>
					Шаг {currentStep.stepNumber} из {steps.length}:{' '}
					{currentStep.stepTitle}
				</div>
				<div className={styles.stepContent}>{currentStep.component}</div>
			</div>
			<div className={styles.stepNavigation}>
				{currentStepIndex > 0 && (
					<Button onClick={goToPreviousStep}>Назад</Button>
				)}
				{!currentStep.hidden && (
					<Button onClick={goToNextStep}>{buttonText}</Button>
				)}
			</div>
		</div>
	)
}

export default Quiz
