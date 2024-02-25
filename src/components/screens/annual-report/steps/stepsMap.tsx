import FinalStep from './step-final/FinalStep'

import { IQuizStep } from '~/components/ui/quiz/quiz.interface'

import {
	IAnnualReport,
	TypeAnnualReportStructure
} from '~/shared/types/annual.interface'

const stepsMap = (
	annualReportInDB: IAnnualReport | null | undefined,
	stepOne: IQuizStep[],
	stepOneDone: boolean,
	stepTwo: IQuizStep[],
	stepThree: IQuizStep[],
	stepFour: IQuizStep[],
	downloadXLSX: () => false | Promise<void>
): IQuizStep[] => {
	const isCashPartners =
		annualReportInDB?.data?.settings?.structure === 'cash/partners'
	const isCashServices =
		annualReportInDB?.data?.settings?.structure === 'cash/services'
	const isAccrualsServices =
		annualReportInDB?.data?.settings?.structure === 'accruals/services'

	const totalCategoriesAmount =
		annualReportInDB?.data?.categories?.main?.reduce(
			(sum, category) => (category.amount ? sum + category.amount : sum),
			0
		)

	const hasOutgoingBankOperationsWithoutCategoryId = Object.values(
		annualReportInDB?.data.bankOperations ?? {}
	)
		.filter(operation => operation.amount < 0)
		.filter(operation => operation.direction === 'main')
		.find(operation => operation.categoryId === '')

	const initialStep = {
		stepTitle: 'Структура отчета',
		onNext: () => {},
		children: stepOne
	}

	const accrualsStep = {
		stepTitle: 'Начисления',
		onNext: () => {},
		// backButtonHidden: stepOneDone,
		nextButtonHidden: totalCategoriesAmount === 0,
		children: stepTwo
	}

	const incomeStep = {
		stepTitle: 'Поступления',
		onNext: () => {},
		children: stepThree
	}

	const costsStep = {
		stepTitle: 'Списания',
		onNext: () => {},
		// nextButtonHidden: hasOutgoingBankOperationsWithoutCategoryId,
		children: stepFour
	}

	const finalStep = {
		stepTitle: 'Предварительный просмотр',
		onNext: () => downloadXLSX(),
		onNextButtonTitle: 'Скачать отчет',
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
