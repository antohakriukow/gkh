import Accruals from './components/Accruals'
import AccrualsSummary from './components/accruals-summary/AccrualsSummary'
import { directionTitles } from '~/data/directions-titles'

import { IQuizStep } from '~/components/ui/quiz/quiz.interface'

import { IAnnualReport, IAnnualStepData } from '~/shared/types/annual.interface'

import { getExistingDirections } from '~/utils/annual.utils'

const AccrualsSetterMap = (annualReport: IAnnualReport): IQuizStep[] => {
	const stepsData = directionTitles.filter(step =>
		getExistingDirections(annualReport.data?.accounts ?? []).includes(
			step.direction
		)
	)

	const hasNoMainAccruals =
		!annualReport?.data?.categories?.main?.reduce(
			(sum, cat) => (!!cat.amount ? sum + cat.amount : sum),
			0
		) ?? false

	const getStep = (step: IAnnualStepData) => ({
		stepTitle: `Начисления по направлению "${step.title}"`,
		onNext: () => {},
		nextButtonHidden: hasNoMainAccruals,
		component: <Accruals direction={step.direction} />
	})

	let sequence = [] as IQuizStep[]

	stepsData.forEach(step => sequence.push(getStep(step)))

	const finalStep = {
		stepTitle: '',
		onNext: () => {},
		component: <AccrualsSummary />
	}

	return [...sequence, finalStep]
}

export default AccrualsSetterMap
