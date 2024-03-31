import { FirebaseError } from 'firebase/app'
import { useState } from 'react'
import { useAuth, useModal, useTypedSelector } from '~/hooks'

import {
	showErrorByReportCreatingNotification,
	showSuccessReportCreatedNotification
} from '~/shared/notifications/toast'
import { IAnnualReportCreate } from '~/shared/types/annual.interface'

import { AnnualService } from '~/services/annual.service'

import { handleDBErrors } from '~/utils/error.utils'

export const useAddReportModal = (
	handleOpenReport: (reportId: string) => void
) => {
	const [isLoading, setIsLoading] = useState(false)
	const { currentCompany } = useTypedSelector(state => state.ui)
	const { user } = useAuth()
	const { hideModal } = useModal()

	const currentCompanyName = currentCompany?.name.short ?? ''
	const DO_YOU_WANT_TO_CREATE_ANNUAL = 'Создать отчет об исполнении сметы?'
	const CREATE = 'Создать'

	const create = async (data: IAnnualReportCreate) => {
		setIsLoading(true)
		try {
			if (!user) return
			const annualId = Date.now().toString()

			await AnnualService.create(user.uid, data, annualId)

			const createdAnnual = await AnnualService.getById(user.uid, annualId)

			if (!!createdAnnual) {
				showSuccessReportCreatedNotification()
				return createdAnnual
			}
		} catch (error) {
			if (error instanceof FirebaseError) handleDBErrors(error)
		} finally {
			hideModal()
			setIsLoading(false)
		}
	}

	const handleCreateReport = async () => {
		if (!currentCompany) return

		try {
			setIsLoading(true)
			create({
				type: 'annual',
				company: currentCompany
			}).then(response => handleOpenReport(response._id))
		} catch (error) {
			showErrorByReportCreatingNotification()
		} finally {
			setIsLoading(false)
		}
	}

	return {
		isLoading,
		currentCompanyName,
		handleCreateReport,

		DO_YOU_WANT_TO_CREATE_ANNUAL,
		CREATE
	}
}
