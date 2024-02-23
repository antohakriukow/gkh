import BankIncomeOperations from './components/BankIncomeOperations'
import FinalStep from './components/final-step/FinalStep'
import Workspace from './workspace/Workspace'
import { getAnnualTagVariationsData } from '~/data/annual-tag-variations'

import { Loader } from '~/components/ui'
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
			<Workspace
				variations={getAnnualTagVariationsData(step.direction)}
				property='tag'
				component={BankIncomeOperations}
				data={filterOperationsByDirection(operations, step.direction)}
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
	return [...sequence, final]
}

export default stepThreeMap
