import { FirebaseError } from 'firebase/app'
import { useState } from 'react'
import {
	useAuth,
	useCompaniesData,
	useModal,
	useReportsData,
	useTypedSelector
} from '~/hooks'

import { IRow } from '~/components/ui/table/table.interface'

import { showSuccessReportCreatedNotification } from '~/shared/notifications/toast'
import { validEmail, validPhone } from '~/shared/regex'
import { IReport, IReportCreate } from '~/shared/types/report.interface'

import { CompanyService } from '~/services/company.service'
import { ReportService } from '~/services/report.service'

import { handleDBErrors } from '~/utils/error.utils'
import { convertPeriod, convertTypeReport } from '~/utils/report.utils'
import { convertTimestampToDate } from '~/utils/time.utils'

export const useReports = () => {
	const { user } = useAuth()
	const { hideModal } = useModal()
	const [isLoading, setIsLoading] = useState(false)
	const { reports, isLoading: isReportsLoading } = useReportsData()
	const { companies, isLoading: isCompaniesLoading } = useCompaniesData()
	const { currentCompany } = useTypedSelector(state => state.ui)

	const ADD_COMPANY = 'Добавить компанию'
	const CREATE_REPORT = 'Создать отчет 22-ЖКХ'
	const REPORTS = 'Отчеты 22-ЖКХ'
	const tableTitles = ['Наименование', 'Период', 'Дата изменения']
	const tableColumnWidths = [5, 5, 5]

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
				showSuccessReportCreatedNotification()
				return createdReport
			}
		} catch (error) {
			if (error instanceof FirebaseError) handleDBErrors(error)
		} finally {
			hideModal()
			setIsLoading(false)
		}
	}

	const convertReportsData = (reports: IReport[]): IRow[] => {
		return Object.values(reports)
			.filter(report => report.company.inn === currentCompany?.inn)
			.map(report => ({
				_id: report._id.toString(),
				data: [
					convertTypeReport(report.type),
					`${convertPeriod(report.period)} ${report.year} г.`,
					convertTimestampToDate(+report.updatedAt)
				]
			}))
	}

	return {
		isLoading,
		isReportsLoading,
		isCompaniesLoading,
		companies,
		reports,
		convertReportsData,
		create,

		ADD_COMPANY,
		CREATE_REPORT,
		REPORTS,
		tableTitles,
		tableColumnWidths
	}
}
