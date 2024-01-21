import { IQuizProps } from './quiz.interface'
import React, { useState } from 'react'

const Quiz: React.FC<IQuizProps> = ({ steps, finalFunction }) => {
	const [currentStepIndex, setCurrentStepIndex] = useState(0)

	const currentStep = steps[currentStepIndex]
	const isLastStep = currentStepIndex === steps.length - 1

	const goToPreviousStep = () => {
		if (currentStepIndex > 0) {
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

	return (
		<div>
			<div className='step-indicator'>
				Шаг {currentStep.stepNumber} из {steps.length}: {currentStep.stepTitle}
			</div>
			<div className='step-content'>{currentStep.component}</div>
			<div className='step-navigation'>
				{currentStepIndex > 0 && (
					<button onClick={goToPreviousStep}>Назад</button>
				)}
				<button onClick={goToNextStep}>
					{isLastStep ? 'Завершить' : 'Далее'}
				</button>
			</div>
		</div>
	)
}

export default Quiz
