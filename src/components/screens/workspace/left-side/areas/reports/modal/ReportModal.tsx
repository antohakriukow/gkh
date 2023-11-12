import { FC } from 'react'

import { Button } from '~/components/ui'
import PeriodSetter from '~/components/ui/period-setter/PeriodSetter'

import { useReport } from '../useReport'

import styles from './ReportModal.module.scss'

const ReportModal: FC = () => {
	const { create, currentCompany } = useReport()
	const handleCreateReport = () => {
		if (!currentCompany) return
		create({
			type: '22gkh',
			year: 2023,
			period: 3,
			company: currentCompany
		})
	}
	return (
		<div className={styles.container}>
			<h3 className={styles.title}>{currentCompany?.name.short}</h3>
			<h4 className={styles.reportSubtitle}>Отчет: 22-ЖКХ (жилище)</h4>
			<h4 className={styles.periodSubtitle}>Выберите отчетный период:</h4>
			<div className={styles.setterContainer}>
				<PeriodSetter type='period' />
				<PeriodSetter type='year' />
			</div>
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
