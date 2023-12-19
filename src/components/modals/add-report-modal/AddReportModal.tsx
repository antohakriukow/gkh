import { FC } from 'react'
import { clear22gkhReportData } from '~/data/clear22gkhReportData'

import { Button } from '~/components/ui'

import { useReport } from '~/hooks/useReport'
import { useTypedSelector } from '~/hooks/useTypedSelector'

import styles from './AddReportModal.module.scss'

const ReportModal: FC = () => {
	const now = new Date()
	const newReportYear = now.getFullYear()
	const newReportPeriod = Math.floor(((now.getMonth() + 9) % 12) / 3) + 1

	const { currentCompany } = useTypedSelector(state => state.ui)
	const { create } = useReport()

	const handleCreateReport = () => {
		if (!currentCompany) return
		create({
			type: '22gkh',
			year: newReportYear,
			period: newReportPeriod,
			company: currentCompany,
			data: clear22gkhReportData
		})
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

	return (
		<div className={styles.container}>
			<h3 className={styles.title}>{currentCompany?.name.short}</h3>
			<p className={styles.reportSubtitle}>Отчет: 22-ЖКХ (жилище)</p>
			<p
				className={styles.periodSubtitle}
			>{`Отчетный период: ${convertedPeriod} ${newReportYear} г.`}</p>
			<Button
				onClick={handleCreateReport}
				style={{ marginTop: 8, width: '100%' }}
			>
				Создать отчет
			</Button>
		</div>
	)
}
export default ReportModal
