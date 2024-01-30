import CategorySelector from './components/category-selector/CategorySelector'
import DataImporter from './components/data-importer/DataImporter'
import GraphCreator from './components/graph-creator/GraphCreator'
import StructureSelector from './components/structure-selector/StructureSelector'

import { IQuizStep } from '~/components/ui/quiz-elements/quiz.interface'

import { AnnualState } from '~/store/annual/annual.interface'

const stepOneMap = (
	state: AnnualState,
	handleStepOneOnNext: () => void,
	handleStepTwoOnPrevious: () => void,
	clearError: () => void
): IQuizStep[] => {
	console.log('state: ', state)
	return [
		{
			stepNumber: 1,
			stepTitle: 'Выбор структуры отчета',
			onNext: () => {
				handleStepOneOnNext()
				clearError()
			},
			component: <StructureSelector />,
			hidden: !state.structure
		},
		{
			stepNumber: 2,
			stepTitle: 'Загрузка данных',
			onPrevious: () => {
				handleStepTwoOnPrevious()
				clearError()
			},
			onNext: () => {
				clearError()
			},
			component: <DataImporter />,
			hidden: !state.accounts.length || !state.operations.length
		},
		{
			stepNumber: 3,
			stepTitle: 'Настройка направлений отчета',
			onNext: () => console.log('Переход к шагу 2'),
			component: <CategorySelector />
		},
		{
			stepNumber: 2,
			stepTitle: 'Настройка статей отчета',
			onNext: () => console.log('Переход к шагу 2'),
			component: <GraphCreator />
		}
	]
}

export default stepOneMap
