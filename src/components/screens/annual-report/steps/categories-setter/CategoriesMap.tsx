import Graph from './graph/Graph'

import { Loader } from '~/components/ui'
import { IQuizStep } from '~/components/ui/quiz/quiz.interface'

import {
	IAnnualCategory,
	IAnnualCategoryState,
	IAnnualReport,
	TypeAnnualDirection
} from '~/shared/types/annual.interface'

interface IStepData {
	title: string
	direction: TypeAnnualDirection
}

const CategoriesMap = (
	annualReport: IAnnualReport,
	handleSaveCategories: () => void,
	isCategoriesPending: boolean
): IQuizStep[] => {
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

	const getStep = (annualReport: IAnnualReport, step: IStepData) => ({
		stepTitle: `Структура отчета по направлению "${step.title}"`,
		onNext: () => handleSaveCategories(),
		component: isCategoriesPending ? (
			<Loader />
		) : (
			<Graph annualReport={annualReport} direction={step.direction} />
		)
	})

	let sequence = [] as IQuizStep[]

	stepsData.forEach(step => {
		if (!annualReport?.data) return

		sequence.push(getStep(annualReport, step))
	})
	return sequence
}

export default CategoriesMap
