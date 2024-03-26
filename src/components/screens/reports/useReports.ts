import { FirebaseError } from 'firebase/app'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { validEmail, validPhone } from '~/shared/regex'
import { IReportCreate } from '~/shared/types/report.interface'

import { CompanyService } from '~/services/company.service'
import { ReportService } from '~/services/report.service'

import { handleDBErrors } from '~/utils/error.utils'

import { useAuth } from '../../../hooks/useAuth'
import { useModal } from '../../../hooks/useModal'

export const useReports = () => {
	const { user } = useAuth()
	const { hideModal } = useModal()
	const [isLoading, setIsLoading] = useState(false)

	const create = async (data: IReportCreate) => {
		setIsLoading(true)
		try {
			if (!user) return
			const reportId = Date.now().toString()

			const currentCompanyData = await CompanyService.getByInn(
				user.uid,
				data.company.inn.toString()
			)

			//Добавим телефон в данные о компании, если он есть в предыдущем отчете
			if (
				!validEmail.test(currentCompanyData.email) ||
				!validPhone.test(currentCompanyData.phone)
			) {
				await CompanyService.update(user.uid, {
					...currentCompanyData,
					email: validPhone.test(currentCompanyData.email)
						? currentCompanyData.email
						: data.company.email,
					phone: validPhone.test(currentCompanyData.phone)
						? currentCompanyData.phone
						: data.company.phone
				})
			}

			await ReportService.create(user.uid, data, reportId)

			const createdReport = await ReportService.getById(user.uid, reportId)

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
