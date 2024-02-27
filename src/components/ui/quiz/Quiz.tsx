import { IQuizStep } from './quiz.interface'
import React, { useEffect, useState } from 'react'

import Button from '../form-elements/Button'

import styles from './quiz.module.scss'

const Quiz: React.FC<{
	steps: IQuizStep[]
	initialStepIndex?: number
}> = ({ steps, initialStepIndex = 0 }) => {
	const [currentStepIndex, setCurrentStepIndex] = useState(initialStepIndex)
	const [currentChildIndex, setCurrentChildIndex] = useState(0)

	useEffect(() => {
		setCurrentStepIndex(initialStepIndex)
		setCurrentChildIndex(0)
	}, [initialStepIndex])

	const currentStep = steps[currentStepIndex]
	const childSteps = 'children' in currentStep ? currentStep.children : null
	const isLastStep = currentStepIndex === steps.length - 1
	const hasChildSteps = childSteps && childSteps.length > 0
	const isLastChildStep = currentChildIndex === (childSteps?.length ?? 0) - 1

	const goToPreviousStep = () => {
		if (hasChildSteps && currentChildIndex === 0) {
			// Если находимся на первом дочернем шаге и это не первый родительский шаг
			if (currentStepIndex > 0) {
				const previousStepIndex = currentStepIndex - 1
				const previousStep = steps[previousStepIndex]
				setCurrentStepIndex(previousStepIndex)

				// Проверяем, есть ли у предыдущего родительского шага дочерние шаги
				if ('children' in previousStep && previousStep.children) {
					// Устанавливаем currentChildIndex на последний дочерний шаг предыдущего родительского шага
					setCurrentChildIndex(previousStep.children.length - 1)
				} else {
					// Если у предыдущего родительского шага нет дочерних шагов, сбрасываем currentChildIndex на 0
					setCurrentChildIndex(0)
				}
			}
		} else if (hasChildSteps && currentChildIndex > 0) {
			// Если находимся не на первом дочернем шаге, просто переходим к предыдущему дочернему шагу
			const previousChildIndex = currentChildIndex - 1
			childSteps![previousChildIndex].onPrevious?.()
			setCurrentChildIndex(previousChildIndex)
		} else if (currentStepIndex > 0) {
			// Если находимся на родительском шаге без дочерних или это первый дочерний шаг первого родительского шага
			currentStep.onPrevious?.()
			setCurrentStepIndex(currentStepIndex - 1)
			setCurrentChildIndex(0) // Сбрасываем индекс дочернего шага на начальное значение
		}
	}

	const goToNextStep = () => {
		if (hasChildSteps && isLastChildStep) {
			childSteps![currentChildIndex].onNext() // Вызов onNext последнего дочернего шага

			// Проверяем, является ли текущий родительский шаг последним
			if (!isLastStep) {
				setCurrentStepIndex(currentStepIndex + 1) // Переход к следующему родительскому шагу
				setCurrentChildIndex(0) // Сброс индекса дочернего шага
			}
			// Если нужно вызвать onNext родительского шага после завершения всех дочерних шагов, добавьте здесь
		} else if (hasChildSteps && !isLastChildStep) {
			childSteps![currentChildIndex].onNext()
			setCurrentChildIndex(currentChildIndex + 1)
		} else if (!isLastStep) {
			currentStep.onNext()
			setCurrentStepIndex(currentStepIndex + 1)
			setCurrentChildIndex(0) // Сброс индекса дочернего шага при переходе к следующему родительскому шагу
		} else {
			// Если это последний родительский шаг и нет дочерних шагов
			currentStep.onNext()
		}
	}

	const backButtonDisabled = hasChildSteps
		? childSteps![currentChildIndex].backButtonHidden ??
		  currentStep.backButtonHidden
		: currentStep.backButtonHidden

	const nextButtonDisabled =
		hasChildSteps && !isLastChildStep
			? childSteps![currentChildIndex].nextButtonHidden
			: currentStep.nextButtonHidden || (isLastStep && !currentStep.onNext)

	const renderStepContent = () => {
		const completedSteps = hasChildSteps
			? childSteps!.slice(0, currentChildIndex).map((step, index) => (
					<div key={index} className={styles.completedStep}>
						<div>{`${index + 1}. ${step.stepTitle}:`}</div>
						<div>Выполнено</div>
					</div>
			  ))
			: null

		const currentStepContent = hasChildSteps
			? childSteps![currentChildIndex].component
			: 'component' in currentStep
			? currentStep.component
			: null

		return (
			<>
				{completedSteps}
				<div className={styles.currentStep}>{currentStepContent}</div>
			</>
		)
	}

	const buttonText = (() => {
		if (hasChildSteps && !isLastChildStep) {
			return childSteps![currentChildIndex].onNextButtonTitle || 'Далее'
		} else {
			return (
				currentStep.onNextButtonTitle || (isLastStep ? 'Завершить' : 'Далее')
			)
		}
	})()

	const stepText =
		currentStepIndex > 0
			? `Шаг ${currentStepIndex + 1} из ${steps.length}: ${
					currentStep.stepTitle
			  }`
			: `Шаг ${currentStepIndex + 1}: ${currentStep.stepTitle}`

	return (
		<div className={styles.container}>
			<div className={styles.stepIndicator}>{stepText}</div>
			<div className={styles.stepContent}>{renderStepContent()}</div>
			<div className={styles.stepNavigation}>
				{(currentStepIndex > 0 || currentChildIndex > 0) && (
					<Button
						disabled={backButtonDisabled && currentChildIndex === 0}
						onClick={goToPreviousStep}
					>
						Назад
					</Button>
				)}
				<Button disabled={nextButtonDisabled} onClick={goToNextStep}>
					{buttonText}
				</Button>
			</div>
		</div>
	)
}

export default Quiz
