import cn from 'clsx'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import AddReportBtn from '~/components/screens/reports/buttons/AddReportBtn'
import ReportModal from '~/components/screens/reports/modals/add-report-modal/AddReportModal'
import { Heading, Table } from '~/components/ui'
import { IRow } from '~/components/ui/table/table.interface'

import { useData } from '~/hooks/useData'
import { useModal } from '~/hooks/useModal'
import { useTypedSelector } from '~/hooks/useTypedSelector'

import Intro from '~/shared/Intro'
import { IReport } from '~/shared/types/report.interface'

import { convertPeriod, convertTypeReport } from '~/utils/report.utils'
import { convertTimestampToDate } from '~/utils/time.utils'

import styles from './Reports.module.scss'

const Reports: FC = () => {
	const { reports } = useData()
	const { currentCompany } = useTypedSelector(state => state.ui)
	const { showModal } = useModal()
	const navigate = useNavigate()

	const handleOpenReport = (reportId: string) => {
		navigate(`/reports/edit/${reportId}`)
	}

	const handleAdd = () =>
		showModal(<ReportModal handleOpenReport={handleOpenReport} />)

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

	return (
		<div className={cn(styles.container, 'introAnchor')}>
			<div className={styles.headingContainer}>
				<Heading title='Отчеты 22-ЖКХ' className={styles.heading} />
			</div>
			<AddReportBtn onClick={handleAdd} />
			<Table
				titles={['Наименование', 'Период', 'Дата изменения']}
				rows={convertReportsData(reports)}
				columnWidths={[5, 5, 5]}
				onClick={handleOpenReport}
				height={90}
			/>
			<Intro />
		</div>
	)
}
export default Reports
