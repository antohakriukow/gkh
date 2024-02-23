import DataImporter from './components/data-importer/DataImporter'
import DirectionSelector from './components/direction-selector/DirectionSelector'
import FinalStep from './components/final-step/FinalStep'
import Graph from './components/graph/Graph'
import StructureSelector from './components/structure-selector/StructureSelector'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { getAnnualCategoriesGraph } from '~/core/annual/getAnnualCategoriesGraph'

import { IQuizStep } from '~/components/ui/quiz/quiz.interface'

import { TypeAnnualReportStructure } from '~/shared/types/annual.interface'

// import { getAnnualCategoriesGraph } from '~/utils/annual.utils'
import { AnnualState } from '~/store/annual/annual.interface'

const stepOneMap = (
	state: AnnualState,
	handleStepOneOnNext: () => void,
	handleRefreshStepTwo: () => void,
	handleRefreshStepThree: () => void,
	handleSetInitialCategories: () => void,
	saveReportData: () => void,
	clearError: () => void,
	setAnnualReportInitialDataSavedToDb: ActionCreatorWithPayload<
		boolean,
		'ui/setAnnualReportInitialDataSavedToDb'
	>
): IQuizStep[] => {
	const selectStructure = {
		stepTitle: 'Выбор структуры отчета',
		onNext: () => {
			handleStepOneOnNext()
			clearError()
		},
		component: <StructureSelector />,
		nextButtonHidden: !state.structure
	}

	const importData = {
		stepTitle: 'Загрузка данных',
		onPrevious: () => {
			handleRefreshStepTwo()
			clearError()
			setAnnualReportInitialDataSavedToDb(false)
		},
		onNext: () => {
			clearError()
			if (state.structure === 'accruals/services')
				getAnnualCategoriesGraph(state)
		},
		component: <DataImporter />,
		nextButtonHidden: !state.accounts.length || !state.operations.length
	}

	const selectDirections = {
		stepTitle: 'Настройка направлений отчета',
		onPrevious: () => {
			handleRefreshStepThree()
			clearError()
			setAnnualReportInitialDataSavedToDb(false)
		},
		onNext: () => {
			if (state.structure === 'cash/partners') handleSetInitialCategories()
			clearError()
		},
		component: <DirectionSelector />,
		nextButtonHidden: !!state.accounts.find(
			acc => acc.type === undefined || acc.type === ''
		)
	}

	const createGraph = {
		stepTitle: 'Настройка статей отчета',
		onPrevious: () => {
			clearError()
			setAnnualReportInitialDataSavedToDb(false)
		},
		onNext: () => {
			clearError()
		},
		component: <Graph />
	}

	const final = {
		stepTitle: '',
		onPrevious: () => setAnnualReportInitialDataSavedToDb(false),
		onNext: () => {
			saveReportData()
			clearError()
		},
		nextButtonHidden: true,
		component: <FinalStep />
	}

	const getStepsSequence = (
		structure: TypeAnnualReportStructure | null | undefined
	) => {
		switch (structure) {
			case 'cash/partners':
				return [selectStructure, importData, selectDirections, final]

			case 'accruals/services':
				return [selectStructure, importData, selectDirections, final]

			case 'cash/services':
				return [
					selectStructure,
					importData,
					selectDirections,
					createGraph,
					final
				]

			default:
				return [
					selectStructure,
					importData,
					selectDirections,
					createGraph,
					final
				]
		}
	}

	const sequence = getStepsSequence(state.structure)

	return sequence
}

export default stepOneMap
