import Workspace from './workspace/Workspace'
import { getAnnualTagVariationsData } from '~/data/annual-tag-variations'
import { directionTitles } from '~/data/directions-titles'

import { IQuizStep } from '~/components/ui/quiz/quiz.interface'

import {
	IAnnualReport,
	IExtendedBankOperation,
	TypeAnnualDirection,
	TypeAnnualOperationTag
} from '~/shared/types/annual.interface'

import { getExistingDirections } from '~/utils/annual.utils'

import BankOperations from '../shared/bank-operations/IncomeBankOperations'

interface IStepData {
	title: string
	direction: TypeAnnualDirection
}

const stepThreeMap = (
	annualReport: IAnnualReport,
	setBankOperationsTag: (
		operationIds: string[],
		tag: TypeAnnualOperationTag
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
				variations={getAnnualTagVariationsData(step.direction)}
				property='tag'
				component={BankOperations}
				data={filterOperationsByDirection(
					operations.filter(operation => operation.amount > 0),
					step.direction
				)}
				handleSubmit={setBankOperationsTag}
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

export default stepThreeMap
