import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getAnnualCategoriesGraph } from '~/core/annual/getAnnualCategoriesGraph'

import { useAuth } from '~/hooks/useAuth'
import { useTypedSelector } from '~/hooks/useTypedSelector'

import {
	IAnnualCategory,
	IAnnualCategoryState,
	IAnnualReport
} from '~/shared/types/annual.interface'

import { AnnualService } from '~/services/annual.service'

import { removeCollapsedFromCategories } from '~/utils/annual.utils'

export const useCategories = () => {
	const [isLoading, setIsLoading] = useState(false)
	const { user } = useAuth()
	const { reportId } = useParams<{ reportId: string }>()
	const { categories } = useTypedSelector(state => state.annual)

	const saveMainCategories = async () => {
		if (!user || !reportId) return
		setIsLoading(true)

		try {
			await AnnualService.updateCategories(
				user.uid,
				reportId,
				'main',
				removeCollapsedFromCategories(categories) as IAnnualCategory[]
			)
			toast('Данные успешно обновлены', { type: 'success' })
		} catch (error) {
			console.error('Ошибка при обновлении данных:', error)
			toast('Ошибка при обновлении данных', { type: 'error' })
			setIsLoading(false)
		} finally {
			setIsLoading(false)
		}
	}

	return { isCategoriesPending: isLoading, saveMainCategories }
}
