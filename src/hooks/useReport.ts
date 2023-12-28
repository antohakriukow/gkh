import { useData } from './useData'
import { useModal } from './useModal'
import { FirebaseError } from 'firebase/app'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { IReportCreate } from '~/shared/types/report.interface'

import { ReportService } from '~/services/report.service'

import { handleDBErrors } from '~/utils/error.utils'

export const useReport = () => {
	const { userUid } = useData()
	const { hideModal } = useModal()
	const [isLoading, setIsLoading] = useState(false)

	const create = async (data: IReportCreate) => {
		setIsLoading(true)
		try {
			if (!userUid) return
			const reportId = Date.now().toString()

			await ReportService.create(userUid, data, reportId)

			const createdReport = await ReportService.getById(userUid, reportId)

			if (!!createdReport) {
				toast.success('Отчет создан', { autoClose: 3000 })
				return createdReport
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
