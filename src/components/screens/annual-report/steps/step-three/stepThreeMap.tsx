import BankIncomeOperations from './components/BankIncomeOperations'
import FinalStep from './components/final-step/FinalStep'

import { IQuizStep } from '~/components/ui/quiz/quiz.interface'

import {
	IAnnualReport,
	IExtendedBankOperation,
	TypeAnnualDirection
} from '~/shared/types/annual.interface'

interface IStepData {
	title: string
	direction: TypeAnnualDirection
}

const stepThreeMap = (annualReport: IAnnualReport): IQuizStep[] => {
	const filterOperationsByDirection = (
		bankOperations: IExtendedBankOperation[],
		direction: TypeAnnualDirection
	) => {
		return bankOperations.filter(operation => operation.direction === direction)
	}

	const stepsData = [
		{ title: 'ЖКУ', direction: 'main' },
		{ title: 'Капремонт', direction: 'renovation' },
		{ title: 'Целевые взносы', direction: 'target' },
		{ title: 'Коммерческая деятельность', direction: 'commerce' }
	] as IStepData[]

	const getStep = (operations: IExtendedBankOperation[], step: IStepData) => ({
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
