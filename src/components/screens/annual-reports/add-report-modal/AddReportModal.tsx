import { FC, Fragment, useState } from 'react'
import { toast } from 'react-toastify'

import { Button, Loader } from '~/components/ui'

import { useAnnual } from '~/hooks/useAnnual'
import { useTypedSelector } from '~/hooks/useTypedSelector'

import styles from './AddReportModal.module.scss'

interface IReportModalProps {
	handleOpenReport: (reportId: string) => void
}

const ReportModal: FC<IReportModalProps> = ({ handleOpenReport }) => {
	const [isLoading, setIsLoading] = useState(false)
	const { create } = useAnnual()
	const { currentCompany } = useTypedSelector(state => state.ui)

	const handleCreateReport = async () => {
		if (!currentCompany) return

		try {
			setIsLoading(true)
			await new Promise(resolve => setTimeout(resolve, 2000))
			create({
				type: 'annual',
				company: currentCompany
			}).then(response => handleOpenReport(response._id))
		} catch (error) {
			toast('Ошибка при создании отчета', { type: 'error' })
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className={styles.container}>
			{isLoading ? (
				<Loader />
			) : (
				<Fragment>
					<h3 className={styles.title}>{currentCompany?.name.short}</h3>
					<p className={styles.reportSubtitle}>
						Создать отчет об исполнении сметы?
					</p>
					<Button onClick={handleCreateReport} style={{ marginTop: 20 }}>
						Создать
					</Button>
				</Fragment>
			)}
		</div>
	)
}
export default ReportModal
