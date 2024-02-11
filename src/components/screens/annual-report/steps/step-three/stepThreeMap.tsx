import BankIncomeOperations from './components/BankIncomeOperations'
import FinalStep from './components/final-step/FinalStep'

import { IQuizStep } from '~/components/ui/quiz-elements/quiz.interface'

import {
	IAnnualReport,
	IOperation,
	TypeAnnualDirection
} from '~/shared/types/annual.interface'

interface IStepData {
	title: string
	direction: TypeAnnualDirection
}

const stepThreeMap = (annualReport: IAnnualReport): IQuizStep[] => {
	const filterOperationsByDirection = (
		operations: IOperation[],
		direction: TypeAnnualDirection
	) => {
		return operations.filter(operation => operation.direction === direction)
	}

	const stepsData = [
		{ title: 'ЖКУ', direction: 'main' },
		{ title: 'Капремонт', direction: 'renovation' },
		{ title: 'Целевые взносы', direction: 'target' },
		{ title: 'Коммерческая деятельность', direction: 'commerce' }
	] as IStepData[]

	const getStep = (operations: IOperation[], step: IStepData) => ({
		stepTitle: `Поступления по направлению "${step.title}"`,
		onNext: () => {},
		component: (
			<BankIncomeOperations
				title={`Распределите операции направления "${step.title}"`}
				operations={filterOperationsByDirection(operations, step.direction)}
			/>
		)
	})

	let sequence = [] as IQuizStep[]

	stepsData.forEach(step => {
		if (!annualReport?.data?.operations) return
		if (
			filterOperationsByDirection(
				annualReport?.data?.operations,
				step.direction
			).length > 0
		) {
			sequence.push(
				getStep(
					filterOperationsByDirection(
						annualReport?.data?.operations,
						step.direction
					),
					step
				)
			)
		}
	})

	const final = {
		stepTitle: '',
		onNext: () => {},
		nextButtonHidden: true,
		component: <FinalStep />
	}

	console.log('sequence: ', sequence)
	return [...sequence, final]
}

export default stepThreeMap
