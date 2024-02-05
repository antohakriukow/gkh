import StepOne from './step-one/StepOne'
import StepTwo from './step-two/StepTwo'

import { IQuizStep } from '~/components/ui/quiz-elements/quiz.interface'

import { IAnnualReport } from '~/shared/types/annual.interface'

const stepsMap = (
	currentAnnualReport: IAnnualReport | null,
	isNextButtonHiddenOnStepOne: boolean
): IQuizStep[] => {
	console.log('isNextButtonHiddenOnStepOne: ', isNextButtonHiddenOnStepOne)
	return [
		{
			stepNumber: 1,
			stepTitle: 'Структура отчета',
			onNext: () => console.log('Переход к шагу 2!'),
			hidden: isNextButtonHiddenOnStepOne,
			component: <StepOne />
		},
		{
			stepNumber: 2,
			stepTitle: 'Название шага 2',
			onNext: () => console.log('Переход к шагу 3'),
			component: <StepTwo />
		}
	]
}

export default stepsMap
