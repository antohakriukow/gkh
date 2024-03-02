import Preview from './preview/Preview'
import { IPaymentButtonData } from '~/payment/payment.interface'

import { IQuizStep } from '~/components/ui/quiz/quiz.interface'

import {
	IAnnualReport,
	TypeAnnualReportStructure
} from '~/shared/types/annual.interface'

const stepsMap = (
	annualReportInDB: IAnnualReport | null | undefined,

	initialStepComponent: IQuizStep[],
	categoriesStepComponent: IQuizStep[],
	accrualsStepComponent: IQuizStep[],
	creditStepComponent: IQuizStep[],
	debitStepComponent: IQuizStep[],

	initialStepDone: boolean,

	downloadXLSX: () => void,

	isReportPayed: boolean,
	paymentButtonData: IPaymentButtonData
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

	// const hasOutgoingBankOperationsWithoutCategoryId = Object.values(
	// 	annualReportInDB?.data.bankOperations ?? {}
	// )
	// 	.filter(operation => operation.amount < 0)
	// 	.filter(operation => operation.direction === 'main')
	// 	.find(operation => operation.categoryId === '')

	const initialStep = {
		stepTitle: 'Структура отчета',
		onNext: () => {},
		children: initialStepComponent
	}

	const categoriesStep = {
		stepTitle: 'Структура отчета',
		backButtonHidden: initialStepDone,
		onNext: () => {},
		children: categoriesStepComponent
	}

	const accrualsStep = {
		stepTitle: 'Начисления',
		onNext: () => {},
		nextButtonHidden: totalCategoriesAmount === 0,
		children: accrualsStepComponent
	}

	const creditSorterStep = {
		stepTitle: 'Поступления',
		onNext: () => {},
		children: creditStepComponent
	}

	const debitSorterStep = {
		stepTitle: 'Списания',
		onNext: () => {},
		// nextButtonHidden: hasOutgoingBankOperationsWithoutCategoryId,
		children: debitStepComponent
	}

	const previewStep = {
		stepTitle: 'Предварительный просмотр',
		onNext: isReportPayed
			? () => downloadXLSX()
			: () => paymentButtonData.onClick(),
		onNextButtonTitle: isReportPayed
			? 'Скачать отчет'
			: paymentButtonData.buttonTitle,
		backButtonHidden: (isCashPartners || isAccrualsServices) && initialStepDone,
		component: <Preview />
	}

	const getStepsSequence = (
		structure: TypeAnnualReportStructure | null | undefined
	) => {
		switch (structure) {
			case 'cash/partners':
				return [initialStep, previewStep]
			case 'accruals/services':
				return [initialStep, previewStep]
			case 'cash/services':
				return [
					initialStep,
					categoriesStep,
					accrualsStep,
					creditSorterStep,
					debitSorterStep,
					previewStep
				]
			default:
				return [
					initialStep,
					accrualsStep,
					creditSorterStep,
					debitSorterStep,
					previewStep
				]
		}
	}

	const sequence = getStepsSequence(annualReportInDB?.data?.settings?.structure)

	return sequence
}

export default stepsMap
