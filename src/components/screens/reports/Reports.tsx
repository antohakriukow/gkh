import Table from './table/Table'
import cn from 'clsx'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import AddReportBtn from '~/components/screens/reports/buttons/AddReportBtn'
import ReportModal from '~/components/screens/reports/modals/add-report-modal/AddReportModal'
import { Heading } from '~/components/ui'

import { useModal } from '~/hooks/useModal'

import Intro from '~/shared/Intro'

import styles from './Reports.module.scss'

const Reports: FC = () => {
	const { showModal } = useModal()
	const navigate = useNavigate()

	const handleOpenReport = (reportId: number) => {
		navigate(`/reports/edit/${reportId}`)
	}

	const handleAdd = () =>
		showModal(<ReportModal handleOpenReport={handleOpenReport} />)

	return (
		<div className={cn(styles.container, 'introAnchor')}>
			<div className={styles.headingContainer}>
				<Heading title='Отчеты' className={styles.heading} />
			</div>
			<AddReportBtn onClick={handleAdd} />
			<Table />
			<Intro />
		</div>
	)
}
export default Reports
