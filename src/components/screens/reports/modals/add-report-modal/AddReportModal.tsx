import { getReportInitialData } from './getReportInitialData'
import { FC, useState } from 'react'

import { Button } from '~/components/ui'

import { useData } from '~/hooks/useData'
import { useModal } from '~/hooks/useModal'
import { useReport } from '~/hooks/useReport'
import { useTypedSelector } from '~/hooks/useTypedSelector'

import { IReport } from '~/shared/types/report.interface'

import styles from './AddReportModal.module.scss'

const ReportModal: FC<{ handleOpenReport: (_id: number) => void }> = ({
	handleOpenReport
}) => {
	const { reports } = useData()
	const { create } = useReport()
	const { hideModal } = useModal()
	const { currentCompany } = useTypedSelector(state => state.ui)
	const [isReportExisting, setIsReportExisting] = useState(false)

	const now = new Date()
	const newReportYear = now.getFullYear()
	const newReportPeriod = Math.floor(((now.getMonth() + 9) % 12) / 3) + 1

	const existingReport = reports.find(
		report => report.period === newReportPeriod && report.year === newReportYear
	)

	const previousReport = reports.find(
		report => report.period === newReportPeriod && report.year === newReportYear
	)

	const handleCreateReport = async () => {
		if (!currentCompany) return
		const newReport = (await create({
			type: '22gkh',
			year: newReportYear,
			period: newReportPeriod,
			company: currentCompany,
			data: getReportInitialData(previousReport)
		})) as IReport
		console.log(newReport)
		if (!!newReport && !!newReport._id) handleOpenReport(newReport._id)
	}

	const handleCreate = () =>
		!!existingReport ? setIsReportExisting(true) : handleCreateReport()

	const handleGoToReport = () => {
		if (!!existingReport) handleOpenReport(existingReport?._id)
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
				return 'год'
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
			<Button onClick={handleCreate} style={{ marginTop: 8, width: '100%' }}>
				Создать отчет
			</Button>
		</div>
	)
}
export default ReportModal
