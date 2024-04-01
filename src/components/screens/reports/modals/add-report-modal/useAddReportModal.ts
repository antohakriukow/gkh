import { getReportInitialData } from './add-report-modal.utils'
import { useState } from 'react'
import { useModal, useReportsData, useTypedSelector } from '~/hooks'

import { IReport } from '~/shared/types/report.interface'

import { convertPeriod } from '~/utils/report.utils'

import { useReports } from '../../useReports'

export const useAddReportModal = (handleOpenReport: (_id: string) => void) => {
	const { reports } = useReportsData()
	const { create } = useReports()
	const { hideModal } = useModal()
	const { currentCompany } = useTypedSelector(state => state.ui)
	const [isReportExisting, setIsReportExisting] = useState(false)

	const GO = 'Перейти'
	const GO_TO_REPORT = 'Перейти к отчету?'
	const REPORT_TITLE = 'Отчет: 22-ЖКХ (жилище)'
	const CREATE_REPORT = 'Создать отчет'

	const now = new Date()
	const currentYear = now.getFullYear()
	const newReportYear = now.getMonth() <= 2 ? currentYear - 1 : currentYear
	const newReportPeriod = Math.floor(((now.getMonth() + 9) % 12) / 3) + 1

	const existingReport = reports.find(
		report =>
			report.period === newReportPeriod &&
			report.year === newReportYear &&
			report.company.inn === currentCompany?.inn
	)

	const previousReport = [...reports]
		.reverse()
		.find(report => report.company.inn === currentCompany?.inn)

	const handleCreateReport = async () => {
		if (!currentCompany) return
		const previousReportPhone = previousReport?.company.phone ?? ''
		const previousReportEmail = previousReport?.company.email ?? ''

		const newReport: IReport = await create({
			type: '22gkh',
			year: newReportYear,
			period: newReportPeriod,
			company: {
				...currentCompany,
				phone: currentCompany.phone ?? previousReportPhone,
				email: currentCompany.email ?? previousReportEmail
			},
			data: getReportInitialData(previousReport)
		})
		if (!!newReport && !!newReport._id)
			handleOpenReport(newReport._id.toString())
	}

	const handleCreate = () =>
		!!existingReport ? setIsReportExisting(true) : handleCreateReport()

	const handleGoToReport = () => {
		if (!!existingReport) handleOpenReport(existingReport?._id.toString())
		hideModal()
	}

	const convertedPeriod = convertPeriod(newReportPeriod)

	const reportIsExistingNotification = `Отчет за ${convertedPeriod} ${newReportYear} г. уже существует.`
	const periodTitle = `Отчетный период: ${convertedPeriod} ${newReportYear} г.`

	const companyName = currentCompany?.name.short

	return {
		isReportExisting,
		reportIsExistingNotification,
		periodTitle,
		companyName,
		handleGoToReport,
		handleCreate,

		GO,
		GO_TO_REPORT,
		REPORT_TITLE,
		CREATE_REPORT
	}
}
