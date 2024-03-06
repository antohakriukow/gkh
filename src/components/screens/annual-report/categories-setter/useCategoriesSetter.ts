import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useAuth } from '~/hooks/useAuth'

import {
	IAnnualCategory,
	IAnnualCategoryState
} from '~/shared/types/annual.interface'

import { AnnualService } from '~/services/annual.service'

import { removeCollapsedFromCategories } from '~/utils/annual.utils'

export const useCategoriesSetter = () => {
	const { user } = useAuth()
	const { reportId } = useParams<{ reportId: string }>()
	const navigate = useNavigate()

	const redirectToAccrualsSetter = () =>
		navigate(`/annual-reports/edit/${reportId}/accruals-setter`)

	const saveMainCategories = async (categories: IAnnualCategoryState[]) => {
		if (!user || !reportId) return

		try {
			await AnnualService.updateCategories(
				user.uid,
				reportId,
				'main',
				removeCollapsedFromCategories(categories) as IAnnualCategory[]
			)
			toast('Данные успешно обновлены', { type: 'success' })
		} catch (error) {
			toast('Ошибка при обновлении данных', { type: 'error' })
		}
	}

	return { saveMainCategories, redirectToAccrualsSetter }
}
