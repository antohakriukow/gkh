import { IAnnualReportCategoriesFormInput } from './accruals-setter.interface'
import Form from './components/Form'
import Resume from './components/resume/Resume'
import { useAccrualsSetter } from './useAccrualsSetter'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import Loader from '~/components/ui/loader/Loader'

import { useAuth } from '~/hooks/useAuth'

import {
	IAnnualCategory,
	TypeDefinedAnnualDirection
} from '~/shared/types/annual.interface'

import { AnnualService } from '~/services/annual.service'

import { getExistingDirections } from '~/utils/annual.utils'

import Container from '../shared/container/Container'
import { useAnnualReport } from '../useAnnualReport'

const AccrualsSetter: FC = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [step, setStep] = useState<number>(0) // 0, 1, 2, 3
	const { reportId } = useParams<{ reportId: string }>()
	const navigate = useNavigate()
	const { annualReportInDB } = useAnnualReport()
	const { user } = useAuth()

	const {
		register,
		control,
		handleSubmit,
		setValue,
		formState: { isDirty }
	} = useForm<IAnnualReportCategoriesFormInput>({
		mode: 'onSubmit'
	})

	const directions = (
		['main', 'renovation', 'target', 'commerce'] as TypeDefinedAnnualDirection[]
	).filter(step =>
		getExistingDirections(annualReportInDB?.data?.accounts ?? []).includes(step)
	)

	const {} = useAccrualsSetter(setValue, directions[step]) // активация useEffect

	const redirectToCategoriesSetter = () =>
		navigate(`/annual-reports/edit/${reportId}/categories-setter`)

	const redirectToCreditSorter = () =>
		navigate(`/annual-reports/edit/${reportId}/credit-sorter`)

	const onSubmit: SubmitHandler<
		IAnnualReportCategoriesFormInput
	> = async data => {
		if (!user || !reportId) return

		try {
			const categoriesToUpdate = Object.entries(data.categories)
				.map(([key, { amount }]) => {
					const id = String(parseInt(key))
					const existingCategory = annualReportInDB?.data?.categories?.[
						directions[step]
					]?.find(category => category.id === id)
					return existingCategory ? { ...existingCategory, amount } : null
				})
				.filter(Boolean)

			if (categoriesToUpdate.length > 0) {
				await AnnualService.updateCategories(
					user.uid,
					reportId,
					directions[step],
					categoriesToUpdate as IAnnualCategory[]
				).then(() => toast('Данные успешно обновлены', { type: 'success' }))
			}
		} catch (error) {
			toast('Ошибка при обновлении данных', { type: 'error' })
		}
	}

	const onNext = async () => {
		if (step < directions.length) {
			setIsLoading(true)
			await new Promise(resolve => setTimeout(resolve, 1500))
			await handleSubmit(onSubmit)().then(() => setIsLoading(false))
			setStep(step + 1)
		} else {
			redirectToCreditSorter()
		}
	}

	const onBack = () =>
		step !== 0 ? setStep(step - 1) : redirectToCategoriesSetter()

	return (
		<Container onNext={onNext} onBack={onBack}>
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
			{isLoading && <Loader loaderType='fullscreen' />}
		</Container>
	)
}
export default AccrualsSetter
