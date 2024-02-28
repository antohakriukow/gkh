import Workspace from './workspace/Workspace'
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

import OutgoingBankOperations from '../shared/bank-operations/OutgoingBankOperations'

interface IStepData {
	title: string
	direction: TypeAnnualDirection
}

const DebitSorter = (
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
		onNext: () => {},
		component: (
			<Workspace
				variations={
					!!annualReport.data.categories && !!annualReport.data.categories.main
						? getCategoriesWithoutChildren(annualReport.data.categories.main)
						: []
				}
				property='categoryId'
				component={OutgoingBankOperations}
				data={filterOperationsByDirection(
					operations.filter(operation => operation.amount < 0),
					step.direction
				)}
				handleSubmit={setBankOperationsCategoryId}
				categories={
					!!annualReport.data.categories && !!annualReport.data.categories.main
						? annualReport.data.categories.main
						: []
				}
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

export default DebitSorter
