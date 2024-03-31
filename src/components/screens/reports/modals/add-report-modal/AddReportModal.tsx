import { getReportInitialData } from './getReportInitialData'
import { FC, useState } from 'react'
import { useModal, useReportsData, useTypedSelector } from '~/hooks'

import { Button } from '~/components/ui'

import { IReport } from '~/shared/types/report.interface'

import { useReports } from '../../useReports'

import styles from './AddReportModal.module.scss'

const ReportModal: FC<{ handleOpenReport: (_id: string) => void }> = ({
	handleOpenReport
}) => {
	const { reports } = useReportsData()
	const { create } = useReports()
	const { hideModal } = useModal()
	const { currentCompany } = useTypedSelector(state => state.ui)
	const [isReportExisting, setIsReportExisting] = useState(false)

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

	const previousReportInThisYear = reports.find(
		report =>
			report.period === newReportPeriod - 1 &&
			report.year === newReportYear &&
			report.company.inn === currentCompany?.inn
	)

	const handleCreateReport = async () => {
		if (!currentCompany) return
		const newReport = (await create({
			type: '22gkh',
			year: newReportYear,
			period: newReportPeriod,
			company: {
				...currentCompany,
				phone: currentCompany.phone
					? currentCompany.phone
					: previousReport?.company.phone
					? previousReport.company.phone
					: '',
				email: currentCompany.email
					? currentCompany.email
					: previousReport?.company.email
					? previousReport.company.email
					: ''
			},
			data: getReportInitialData(previousReport)
		})) as IReport
		if (!!newReport && !!newReport._id)
			handleOpenReport(newReport._id.toString())
	}

	const handleCreate = () =>
		!!existingReport ? setIsReportExisting(true) : handleCreateReport()

	const handleGoToReport = () => {
		if (!!existingReport) handleOpenReport(existingReport?._id.toString())
		hideModal()
	}

	const convertPeriod = (period: number) => {
		switch (period) {
			case 1:
				return '1 квартал'
			case 2:
				return '1 полугодие'
			case 3:
				return '9 месяцев'
			case 4:
				return ''
			default:
				return period
		}
	}

	const convertedPeriod = convertPeriod(newReportPeriod)

	if (isReportExisting)
		return (
			<div className={styles.container}>
				<h3
					className={styles.title}
				>{`Отчет за ${convertedPeriod} ${newReportYear} г. уже существует.`}</h3>
				<p className={styles.reportSubtitle}>Перейти к отчету?</p>
				<Button
					onClick={handleGoToReport}
					style={{ marginTop: 8, width: '100%' }}
				>
					Перейти
				</Button>
			</div>
		)

	return (
		<div className={styles.container}>
			<h3 className={styles.title}>{currentCompany?.name.short}</h3>
			<p className={styles.reportSubtitle}>Отчет: 22-ЖКХ (жилище)</p>
			<p
				className={styles.periodSubtitle}
			>{`Отчетный период: ${convertedPeriod} ${newReportYear} г.`}</p>
			<Button onClick={handleCreate} style={{ marginTop: 12 }}>
				Создать отчет
			</Button>
		</div>
	)
}
export default ReportModal
