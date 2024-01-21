import { useData } from './useData'
import { useModal } from './useModal'
import { FirebaseError } from 'firebase/app'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { IAnnualReportCreate } from '~/shared/types/annual.interface'

import { AnnualService } from '~/services/annual.service'

import { handleDBErrors } from '~/utils/error.utils'

export const useAnnual = () => {
	const { userUid } = useData()
	const { hideModal } = useModal()
	const [isLoading, setIsLoading] = useState(false)

	const create = async (data: IAnnualReportCreate) => {
		setIsLoading(true)
		try {
			if (!userUid) return
			const annualId = Date.now().toString()

			await AnnualService.create(userUid, data, annualId)

			const createdAnnual = await AnnualService.getById(userUid, annualId)

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
