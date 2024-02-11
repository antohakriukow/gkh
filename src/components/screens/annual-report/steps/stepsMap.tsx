import StepOne from './step-one/StepOne'
import StepThree from './step-three/StepThree'
import StepTwo from './step-two/StepTwo'

import { IQuizStep } from '~/components/ui/quiz-elements/quiz.interface'

import { IAnnualReport } from '~/shared/types/annual.interface'

const stepsMap = (
	currentAnnualReport: IAnnualReport | null,
	firstStepDone: boolean
): IQuizStep[] => {
	console.log('firstStepDone: ', firstStepDone)
	return [
		{
			stepNumber: 1,
			stepTitle: 'Структура отчета',
			onNext: () => console.log('Переход к шагу 2'),
			nextButtonHidden: !firstStepDone,
			component: <StepOne />
		},
		{
			stepNumber: 2,
			stepTitle: 'Начисления',
			onNext: () => console.log('Переход к шагу 3'),
			backButtonHidden: firstStepDone,
			component: <StepTwo />
		},
		{
			stepNumber: 3,
			stepTitle: 'Поступления',
			onNext: () => console.log('Переход к шагу 4'),
			component: <StepThree />
		},
		{
			stepNumber: 4,
			stepTitle: 'Списания',
			onNext: () => console.log('Переход к шагу 5'),
			component: <></>
		},
		{
			stepNumber: 5,
			stepTitle: 'Финал',
			onNext: () => console.log('???'),
			component: <></>
		}
	]
}

export default stepsMap
