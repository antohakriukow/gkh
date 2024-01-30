import StepOne from './step-one/StepOne'
import StepTwo from './step-two/StepTwo'

import { IQuizStep } from '~/components/ui/quiz-elements/quiz.interface'

import { IAnnualReport } from '~/shared/types/annual.interface'

const stepsMap = (currentAnnualReport: IAnnualReport | null): IQuizStep[] => {
	const hasSettings = !!currentAnnualReport?.data?.settings
	const hasOperations = !!currentAnnualReport?.data?.operations
	const hasAccounts = !!currentAnnualReport?.data?.accounts
	const hasCategories = !!currentAnnualReport?.data?.categories
	const hasDirections = !!currentAnnualReport?.data?.directions

	const isNextButtonHiddenOnStepOne =
		hasSettings ||
		hasOperations ||
		hasAccounts ||
		hasCategories ||
		hasDirections

	return [
		{
			stepNumber: 1,
			stepTitle: 'Структура отчета',
			onNext: () => console.log('Переход к шагу 2'),
			hidden: isNextButtonHiddenOnStepOne ?? true,
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
