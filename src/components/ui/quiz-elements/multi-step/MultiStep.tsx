import { FC, useEffect, useState } from 'react'

import Button from '../../form-elements/Button'
import { IQuizProps } from '../quiz.interface'

import styles from './MultiStep.module.scss'

const MultiStep: FC<IQuizProps> = ({
	steps,
	finalButtonTitle,
	initialStepIndex = 0
}) => {
	const [currentStepIndex, setCurrentStepIndex] = useState(initialStepIndex)

	useEffect(() => {
		setCurrentStepIndex(initialStepIndex)
		console.log('Updated current step index:', initialStepIndex)
	}, [initialStepIndex])

	const currentStep = steps[currentStepIndex]
	const isLastStep = currentStepIndex === steps.length - 1

	const goToPreviousStep = () => {
		if (currentStepIndex > 0) {
			if (!!currentStep.onPrevious) currentStep.onPrevious()
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
			{steps.map((step, index) => (
				<div key={index} className={styles.step}>
					{index === currentStepIndex ? (
						<>
							{step.component}
							{index > 0 && !currentStep.backButtonHidden && (
								<Button onClick={goToPreviousStep}>Назад</Button>
							)}
							{!currentStep.nextButtonHidden && (
								<Button onClick={goToNextStep}>{buttonText}</Button>
							)}
						</>
					) : index < currentStepIndex ? (
						<div className={styles.completedStep}>
							<div>{`${index + 1}. ${step.stepTitle}:`}</div>
							<div>Выполнено</div>
						</div>
					) : null}
				</div>
			))}
		</div>
	)
}

export default MultiStep
