import CategorySelector from './components/category-selector/CategorySelector'
import DataImporter from './components/data-importer/DataImporter'
import GraphCreator from './components/graph-creator/GraphCreator'
import StructureSelector from './components/structure-selector/StructureSelector'
import { Control, FormState, SubmitHandler } from 'react-hook-form'

import { IQuizStep } from '~/components/ui/quiz-elements/quiz.interface'

import { IAnnualReportSettings } from '~/shared/types/annual.interface'

const stepOneMap = (
	handleSubmit: SubmitHandler<IAnnualReportSettings>,
	control: Control<IAnnualReportSettings>,
	getValues: () => IAnnualReportSettings,
	formState: FormState<IAnnualReportSettings>
): IQuizStep[] => [
	{
		stepNumber: 1,
		stepTitle: 'Выбор структуры отчета',
		onNext: () => {
			const formData = getValues()
			handleSubmit(formData)
		},
		component: <StructureSelector control={control} />
	},
	{
		stepNumber: 2,
		stepTitle: 'Загрузка данных',
		onNext: () => {
			const formData = getValues()
			console.log('formData: ', formData)
			handleSubmit(formData)
		},
		component: <DataImporter control={control} />
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

export default stepOneMap
