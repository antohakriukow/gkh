import { IAnnualReportCategoriesFormInput } from './accruals-setter.interface'
import Form from './components/Form'
import Resume from './components/resume/Resume'
import { useAccrualsSetter } from './useAccrualsSetter'
import { FC } from 'react'
import { useForm } from 'react-hook-form'

import Loader from '~/components/ui/loader/Loader'

import { Container, NarrowAttention } from '../../../shared'

const AccrualsSetter: FC = () => {
	const { register, control, handleSubmit, setValue } =
		useForm<IAnnualReportCategoriesFormInput>({
			mode: 'onSubmit'
		})

	const {
		isLoading,
		isDataLoading,
		isReportPayed,
		isNarrow,
		step,
		directions,
		annualReportInDB,
		closeAnnualReport,
		deleteAnnualReport,
		onNext,
		onBack
	} = useAccrualsSetter(setValue, handleSubmit)

	if (isNarrow) return <NarrowAttention />

	if (isLoading || isDataLoading)
		return (
			<Container
				isDeleteButtonDisabled={isReportPayed}
				handleClose={closeAnnualReport}
				handleDelete={deleteAnnualReport}
			>
				<Loader loaderType='fullscreen' />
			</Container>
		)

	return (
		<Container
			onNext={onNext}
			onBack={onBack}
			isDeleteButtonDisabled={isReportPayed}
			handleClose={closeAnnualReport}
			handleDelete={deleteAnnualReport}
		>
			{step < directions.length ? (
				<Form
					direction={directions[step]}
					register={register}
					control={control}
					categoriesInDb={annualReportInDB?.data.categories}
				/>
			) : (
				<Resume />
			)}
		</Container>
	)
}
export default AccrualsSetter
