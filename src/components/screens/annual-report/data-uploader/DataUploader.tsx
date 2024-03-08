import DataImporter from './components/data-importer/DataImporter'
import DirectionSelector from './components/direction-selector/DirectionSelector'
import Resume from './components/resume/Resume'
import StructureSelector from './components/structure-selector/StructureSelector'
import { useDataUploader } from './useDataUploader'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Loader } from '~/components/ui'

import { useWindowWidth } from '~/hooks/useWindowWidth'

import {
	IAccount,
	IAccountingOperation,
	IBankOperation,
	TypeAnnualReportStructure
} from '~/shared/types/annual.interface'

import Container from '../shared/container/Container'
import NarrowAttention from '../shared/narrow-attention/NarrowAttention'
import StepStatus from '../shared/step-status/StepStatus'
import { useAnnualReport } from '../useAnnualReport'

const DataUploader: FC = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
	const { saveReportData, redirectToCategoriesSetter, redirectToPreview } =
		useDataUploader()

	const {
		isReportPayed,
		closeAnnualReport,
		deleteAnnualReport,
		annualReportInDB
	} = useAnnualReport()
	const { width } = useWindowWidth()
	const isNarrow = width < 600

	// data-importer state
	const [annualOperations, setAnnualOperations] = useState<
		IAccountingOperation[] | IBankOperation[]
	>([])
	const [annualAccounts, setAnnualAccounts] = useState<IAccount[]>([])
	const [annualFileNames, setAnnualFileNames] = useState<string[]>([])
	const [annualStartDate, setAnnualStartDate] = useState<string>('')
	const [annualFinalDate, setAnnualFinalDate] = useState<string>('')
	const [annualError, setAnnualError] = useState<string>('')

	//structure-selector state
	const [structure, setStructure] = useState<
		TypeAnnualReportStructure | undefined
	>(undefined)

	const stepOneDone = structure !== undefined
	const stepTwoDone =
		annualOperations.length !== 0 && annualAccounts.length !== 0
	const stepThreeDone = !annualAccounts.some(account => !account.type)

	const handleNext = () => {
		if (step === 1 && stepOneDone) setStep(2)
		if (step === 2 && stepTwoDone) setStep(3)
		if (step === 3 && stepThreeDone) setStep(4)
	}

	const isNextButtonDisabled =
		(step === 1 && !stepOneDone) ||
		(step === 2 && !stepTwoDone) ||
		(step === 3 && !stepThreeDone)

	const stepOneTitle = 'Выбор шаблона отчета'
	const stepTwoTitle = `Загрузка ${
		structure === 'accruals/services'
			? 'журнала операций 1C (Формат XLSX)'
			: 'банковских выписок (Формат 1С 8.3)'
	}`
	const stepThreeTitle = 'Идентификация счетов'
	const stepFourTitle = 'Подтверждение введенных данных'

	const handleSubmit = async () => {
		setIsLoading(true)

		await saveReportData(
			annualOperations,
			annualAccounts,
			annualFileNames,
			annualStartDate,
			annualFinalDate,
			structure
		)
		setIsLoading(false)
		structure === 'cash/services'
			? redirectToCategoriesSetter()
			: redirectToPreview()
	}

	if (annualReportInDB?.data?.settings?.structure)
		structure === 'cash/services'
			? redirectToCategoriesSetter()
			: redirectToPreview()

	if (isNarrow) return <NarrowAttention />

	return (
		<Container
			onNext={step === 4 ? handleSubmit : handleNext}
			hasNoBackButton
			nextButtonDisabled={isNextButtonDisabled}
			NextButtonText={step === 4 ? 'Сохранить и продолжить' : 'Далее'}
			isReportPayed={isReportPayed}
			handleCloseReport={closeAnnualReport}
			handleDeleteReport={deleteAnnualReport}
		>
			<div>
				{step === 1 && (
					<StepStatus title={stepOneTitle}>
						<StructureSelector
							structure={structure}
							setStructure={setStructure}
						/>
					</StepStatus>
				)}

				{step > 1 && stepOneDone && (
					<StepStatus
						title={stepOneTitle}
						isDone={stepOneDone && step > 1}
						onClick={() => setStep(1)}
					/>
				)}

				{step === 2 && (
					<StepStatus title={stepTwoTitle}>
						<DataImporter
							annualOperations={annualOperations}
							annualAccounts={annualAccounts}
							annualFileNames={annualFileNames}
							annualStartDate={annualStartDate}
							annualFinalDate={annualFinalDate}
							annualError={annualError}
							structure={structure}
							setAnnualOperations={setAnnualOperations}
							setAnnualAccounts={setAnnualAccounts}
							setAnnualFileNames={setAnnualFileNames}
							setAnnualStartDate={setAnnualStartDate}
							setAnnualFinalDate={setAnnualFinalDate}
							setAnnualError={setAnnualError}
						/>
					</StepStatus>
				)}

				{step > 2 && stepTwoDone && (
					<StepStatus
						title={stepTwoTitle}
						isDone={stepTwoDone}
						onClick={() => setStep(2)}
					/>
				)}

				{step === 3 && (
					<StepStatus title={stepThreeTitle}>
						<DirectionSelector
							annualAccounts={annualAccounts}
							setAnnualAccounts={setAnnualAccounts}
							structure={structure}
						/>
					</StepStatus>
				)}

				{step > 3 && stepTwoDone && (
					<StepStatus
						title={stepThreeTitle}
						isDone={stepThreeDone}
						onClick={() => setStep(3)}
					/>
				)}

				{step === 4 && (
					<StepStatus title={stepFourTitle} color='#e87d86'>
						<Resume
							annualOperations={annualOperations}
							annualAccounts={annualAccounts}
							annualFileNames={annualFileNames}
							annualStartDate={annualStartDate}
							annualFinalDate={annualFinalDate}
							structure={structure}
						/>
					</StepStatus>
				)}
				{isLoading && <Loader loaderType='fullscreen' />}
			</div>
		</Container>
	)
}
export default DataUploader
