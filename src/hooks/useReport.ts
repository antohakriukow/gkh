import { useActions } from './useActions'
import { useData } from './useData'
import { useModal } from './useModal'
import { useState } from 'react'

import { IReportCreate } from '~/shared/types/report.interface'

import { ReportService } from '~/services/report.service'

export const useReport = () => {
	const { userUid } = useData()
	const { hideModal } = useModal()
	const { setCurrentReport } = useActions()
	const [isLoading, setIsLoading] = useState(false)

	const create = async (data: IReportCreate) => {
		setIsLoading(true)
		try {
			if (!userUid) return
			const reportId = Date.now().toString()

			await ReportService.create(userUid, data, reportId)

			const createdReport = await ReportService.getById(userUid, reportId)

			setCurrentReport(createdReport)
		} catch (error) {
			console.log(error)
		} finally {
			hideModal()
			setIsLoading(false)
		}
	}

	return { isLoading, create }
}
