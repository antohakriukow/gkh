import CreditSorterComponent from './CreditSorterComponent'
import { directionTitles } from '~/data/directions-titles'

import { IQuizStep } from '~/components/ui/quiz/quiz.interface'

import {
	IAnnualReport,
	IExtendedBankOperation,
	TypeAnnualDirection
} from '~/shared/types/annual.interface'

import {
	getCategoriesWithoutChildren,
	getExistingDirections
} from '~/utils/annual.utils'

interface IStepData {
	title: string
	direction: TypeAnnualDirection
}

const CreditSorterMap = (
	annualReport: IAnnualReport,
	saveBankOperationsToDB: () => void
): IQuizStep[] => {
	const filterOperationsByDirection = (
		bankOperations: IExtendedBankOperation[],
		direction: TypeAnnualDirection
	) => {
		return bankOperations.filter(operation => operation.direction === direction)
	}

	// const stepsData = directionTitles.filter(step =>
	// 	getExistingDirections(annualReport.data?.accounts ?? []).includes(
	// 		step.direction
	// 	)
	// )

	const stepsData = [
		{ title: 'ЖКУ', direction: 'main' }
		// { title: 'Капремонт', direction: 'renovation' },
		// { title: 'Целевые взносы', direction: 'target' },
		// { title: 'Коммерческая деятельность', direction: 'commerce' }
	] as IStepData[]

	const getStep = (operations: IExtendedBankOperation[], step: IStepData) => ({
		stepTitle: `Поступления по направлению "${step.title}"`,
		onPrevious: () => saveBankOperationsToDB(),
		onNext: () => saveBankOperationsToDB(),
		component: (
			<CreditSorterComponent
				report={annualReport}
				// handleSubmit={setBankOperationsCategoryId}
			/>
		)
	})

	let sequence = [] as IQuizStep[]

	stepsData.forEach(step => {
		if (!annualReport?.data?.bankOperations) return
		if (
			filterOperationsByDirection(
				annualReport?.data?.bankOperations as IExtendedBankOperation[],
				step.direction
			).length > 0
		) {
			sequence.push(
				getStep(
					filterOperationsByDirection(
						annualReport?.data?.bankOperations as IExtendedBankOperation[],
						step.direction
					),
					step
				)
			)
		}
	})

	return sequence
}

export default CreditSorterMap
