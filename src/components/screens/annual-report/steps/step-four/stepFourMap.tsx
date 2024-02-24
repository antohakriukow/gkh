import Workspace from './workspace/Workspace'

import { IQuizStep } from '~/components/ui/quiz/quiz.interface'

import {
	IAnnualReport,
	IExtendedBankOperation,
	TypeAnnualDirection
} from '~/shared/types/annual.interface'

import { getCategoriesWithoutChildren } from '~/utils/annual.utils'

import OutgoingBankOperations from '../shared/bank-operations/OutgoingBankOperations'

interface IStepData {
	title: string
	direction: TypeAnnualDirection
}

const stepFourMap = (
	annualReport: IAnnualReport,
	setBankOperationsCategoryId: (
		operationIds: string[],
		categoryId: string
	) => void
): IQuizStep[] => {
	const filterOperationsByDirection = (
		bankOperations: IExtendedBankOperation[],
		direction: TypeAnnualDirection
	) => {
		return bankOperations.filter(operation => operation.direction === direction)
	}

	const stepsData = [
		{ title: 'ЖКУ', direction: 'main' }
		// { title: 'Капремонт', direction: 'renovation' },
		// { title: 'Целевые взносы', direction: 'target' },
		// { title: 'Коммерческая деятельность', direction: 'commerce' }
	] as IStepData[]

	const getStep = (operations: IExtendedBankOperation[], step: IStepData) => ({
		stepTitle: `Поступления по направлению "${step.title}"`,
		onNext: () => {},
		component: (
			<Workspace
				variations={
					annualReport.data.categories
						? getCategoriesWithoutChildren(annualReport.data.categories)
						: []
				}
				property='categoryId'
				component={OutgoingBankOperations}
				data={filterOperationsByDirection(
					operations.filter(operation => operation.amount < 0),
					step.direction
				)}
				handleSubmit={setBankOperationsCategoryId}
				categories={annualReport.data.categories}
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

export default stepFourMap
