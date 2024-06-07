import DataImporter from './components/data-importer/DataImporter'
import DirectionSelector from './components/direction-selector/DirectionSelector'
import Resume from './components/resume/Resume'
import StructureSelector from './components/structure-selector/StructureSelector'
import { GO_NEXT, SAVE_AND_CONTINUE, STEP_TITLE } from './data-uploader.data'
import { IStep } from './data-uploader.interface'
import withDataUploaderContext from './provider/withDataUploaderContext'
import { useDataUploader } from './useDataUploader'
import { FC } from 'react'

import { Container, NarrowAttention, StepStatus } from '~/components/shared'
import { Loader } from '~/components/ui'

const DataUploader: FC = () => {
	const {
		isLoading,
		isNarrow,
		isNextButtonDisabled,
		isReportPayed,
		step,
		COMPUTED_STEP_TITLE_TWO,
		stepOneDone,
		stepTwoDone,
		stepThreeDone,
		setStep,
		handleNext,
		closeAnnualReport,
		deleteAnnualReport,
		handleSubmit
	} = useDataUploader()

	if (isNarrow) return <NarrowAttention />

	const steps = [
		{
			id: 1,
			title: STEP_TITLE.ONE,
			component: <StructureSelector />,
			isDone: stepOneDone
		},
		{
			id: 2,
			title: COMPUTED_STEP_TITLE_TWO,
			component: <DataImporter />,
			isDone: stepTwoDone
		},
		{
			id: 3,
			title: STEP_TITLE.THREE,
			component: <DirectionSelector />,
			isDone: stepThreeDone
		},
		{
			id: 4,
			title: STEP_TITLE.FOUR,
			component: <Resume />,
			isDone: true,
			color: '#e87d86'
		}
	] as IStep[]

	return (
		<Container
			onNext={step === 4 ? handleSubmit : handleNext}
			hasNoBackButton
			nextButtonDisabled={isNextButtonDisabled}
			NextButtonText={step === 4 ? SAVE_AND_CONTINUE : GO_NEXT}
			isDeleteButtonDisabled={isReportPayed}
			handleClose={closeAnnualReport}
			handleDelete={deleteAnnualReport}
		>
			<div>
				{steps.map(({ id, title, component, isDone, color }) =>
					step === id ? (
						<StepStatus key={id} title={title} color={color}>
							{component}
						</StepStatus>
					) : (
						id < step &&
						isDone && (
							<StepStatus
								key={id}
								title={title}
								isDone={isDone}
								onClick={() => setStep(id)}
							/>
						)
					)
				)}
				{isLoading && <Loader loaderType='fullscreen' />}
			</div>
		</Container>
	)
}
export default withDataUploaderContext(DataUploader)
