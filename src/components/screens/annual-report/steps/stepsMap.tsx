import FinalStep from './final-step/FinalStep'
import StepTwo from './step-two/StepTwo'

import { IQuizStep } from '~/components/ui/quiz/quiz.interface'

import {
	IAnnualReport,
	TypeAnnualReportStructure
} from '~/shared/types/annual.interface'

const stepsMap = (
	annualReportInDB: IAnnualReport | null | undefined,
	stepOne: IQuizStep[],
	stepOneDone: boolean,
	stepThree: IQuizStep[]
): IQuizStep[] => {
	const isCashPartners =
		annualReportInDB?.data.settings?.structure === 'cash/partners'
	const isCashServices =
		annualReportInDB?.data.settings?.structure === 'cash/services'
	const isAccrualsServices =
		annualReportInDB?.data.settings?.structure === 'accruals/services'

	const initialStep = {
		stepTitle: 'Структура отчета',
		onNext: () => {},
		children: stepOne
	}

	const accrualsStep = {
		stepTitle: 'Начисления',
		onNext: () => {},
		backButtonHidden: stepOneDone,
		component: <StepTwo />
	}

	const incomeStep = {
		stepTitle: 'Поступления',
		onNext: () => {},
		children: stepThree
	}

	const costsStep = {
		stepTitle: 'Списания',
		onNext: () => {},
		component: <></>
	}

	const finalStep = {
		stepTitle: 'Финал',
		onNext: () => {},
		backButtonHidden: (isCashPartners || isAccrualsServices) && stepOneDone,
		component: <FinalStep />
	}

	const getStepsSequence = (
		structure: TypeAnnualReportStructure | null | undefined
	) => {
		switch (structure) {
			case 'cash/partners':
				return [initialStep, finalStep]
			case 'accruals/services':
				return [initialStep, finalStep]
			case 'cash/services':
				return [initialStep, accrualsStep, incomeStep, costsStep, finalStep]
			default:
				return [initialStep, accrualsStep, incomeStep, costsStep, finalStep]
		}
	}

	const sequence = getStepsSequence(annualReportInDB?.data?.settings?.structure)

	return sequence
}

export default stepsMap
