import DataImporter from './components/data-importer/DataImporter'
import DirectionSelector from './components/direction-selector/DirectionSelector'
import Graph from './components/graph/Graph'
import StructureSelector from './components/structure-selector/StructureSelector'

import { IQuizStep } from '~/components/ui/quiz-elements/quiz.interface'

import { getAnnualCategoriesGraph } from '~/utils/annual.utils'

import { AnnualState } from '~/store/annual/annual.interface'

const stepOneMap = (
	state: AnnualState,
	handleStepOneOnNext: () => void,
	handleRefreshStepTwo: () => void,
	handleRefreshStepThree: () => void,
	handleSetInitialCategories: () => void,
	clearError: () => void
): IQuizStep[] => {
	console.log('state: ', state)

	const selectStructure = {
		stepTitle: 'Выбор структуры отчета',
		onNext: () => {
			handleStepOneOnNext()
			clearError()
		},
		component: <StructureSelector />,
		hidden: !state.structure
	}

	const importData = {
		stepTitle: 'Загрузка данных',
		onPrevious: () => {
			handleRefreshStepTwo()
			clearError()
		},
		onNext: () => {
			clearError()
			if (state.structure === 'accruals/services')
				getAnnualCategoriesGraph(state)
		},
		component: <DataImporter />,
		hidden: !state.accounts.length || !state.operations.length
	}

	const selectDirections = {
		stepTitle: 'Настройка направлений отчета',
		onPrevious: () => {
			handleRefreshStepThree()
			clearError()
		},
		onNext: () => {
			handleSetInitialCategories()
			clearError()
		},
		component: <DirectionSelector />,
		hidden: !!state.accounts.find(
			acc => acc.type === undefined || acc.type === ''
		)
	}

	const createGraph = {
		stepTitle: 'Настройка статей отчета',
		onNext: () => console.log('Переход к шагу 2'),
		component: <Graph />
	}

	return [selectStructure, importData, selectDirections, createGraph]
}

export default stepOneMap
