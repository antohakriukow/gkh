import DataImporter from './components/data-importer/DataImporter'
import DirectionSelector from './components/direction-selector/DirectionSelector'
import Graph from './components/graph/Graph'
import StructureSelector from './components/structure-selector/StructureSelector'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { getAnnualCategoriesGraph } from '~/core/annual/getAnnualCategoriesGraph'

import { IQuizStep } from '~/components/ui/quiz-elements/quiz.interface'

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
			setAnnualReportInitialDataSavedToDb(false)
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
			setAnnualReportInitialDataSavedToDb(false)
		},
		onNext: () => {
			state.structure === 'cash/partners'
				? saveReportData()
				: handleSetInitialCategories()
			clearError()
		},
		component: <DirectionSelector />,
		hidden: !!state.accounts.find(
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
			saveReportData()
			clearError()
		},
		component: <Graph />
	}

	const final = {
		stepTitle: '',
		onPrevious: () => setAnnualReportInitialDataSavedToDb(false),
		onNext: () => {},
		hidden: true,
		component: <></>
	}

	const sequence =
		state.structure === 'cash/partners'
			? [selectStructure, importData, selectDirections, final]
			: [selectStructure, importData, selectDirections, createGraph, final]

	return sequence
}

export default stepOneMap
