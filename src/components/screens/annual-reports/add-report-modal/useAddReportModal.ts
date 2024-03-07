import { FirebaseError } from 'firebase/app'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { IAnnualReportCreate } from '~/shared/types/annual.interface'

import { AnnualService } from '~/services/annual.service'

import { handleDBErrors } from '~/utils/error.utils'

import { useAuth } from '../../../../hooks/useAuth'
import { useModal } from '../../../../hooks/useModal'

export const useAddReportModal = () => {
	const { user } = useAuth()
	const { hideModal } = useModal()
	const [isLoading, setIsLoading] = useState(false)

	const create = async (data: IAnnualReportCreate) => {
		setIsLoading(true)
		try {
			if (!user) return
			const annualId = Date.now().toString()

			await AnnualService.create(user.uid, data, annualId)

			const createdAnnual = await AnnualService.getById(user.uid, annualId)

			if (!!createdAnnual) {
				toast.success('Отчет создан', { autoClose: 3000 })
				return createdAnnual
			}
		} catch (error) {
			if (error instanceof FirebaseError) handleDBErrors(error)
		} finally {
			hideModal()
			setIsLoading(false)
		}
	}

	return { isLoading, create }
}
