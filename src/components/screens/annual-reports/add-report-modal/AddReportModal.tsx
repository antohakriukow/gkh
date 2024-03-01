import { FC } from 'react'

import { Button } from '~/components/ui'

import { useAnnual } from '~/hooks/useAnnual'
import { useTypedSelector } from '~/hooks/useTypedSelector'

import styles from './AddReportModal.module.scss'

const ReportModal: FC = () => {
	const { create } = useAnnual()
	const { currentCompany } = useTypedSelector(state => state.ui)

	const handleCreateReport = async () => {
		if (!currentCompany) return
		await create({
			type: 'annual',
			company: currentCompany
		})
	}

	return (
		<div className={styles.container}>
			<h3 className={styles.title}>{currentCompany?.name.short}</h3>
			<p className={styles.reportSubtitle}>
				Создать отчет об исполнении сметы?
			</p>
			<Button onClick={handleCreateReport} style={{ marginTop: 20 }}>
				Создать
			</Button>
		</div>
	)
}
export default ReportModal
