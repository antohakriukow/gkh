import ReportModal from './add-report-modal/AddReportModal'
import cn from 'clsx'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import AddReportBtn from '~/components/screens/reports/buttons/AddReportBtn'
import { Heading, Table } from '~/components/ui'
import { IRow } from '~/components/ui/table/table.interface'

import { useData } from '~/hooks/useData'
import { useModal } from '~/hooks/useModal'
import { useTypedSelector } from '~/hooks/useTypedSelector'

import Intro from '~/shared/Intro'
import { IAnnualReport } from '~/shared/types/annual.interface'

import { convertTypeReport } from '~/utils/report.utils'
import { convertTimestampToDate } from '~/utils/time.utils'

import styles from './AnnualReports.module.scss'

const AnnualReports: FC = () => {
	const { annuals } = useData()
	const { currentCompany } = useTypedSelector(state => state.ui)
	const { showModal } = useModal()
	const navigate = useNavigate()

	const handleOpenReport = (reportId: string) => {
		navigate(`/annual-reports/edit/${reportId}`)
	}

	const handleAdd = () => showModal(<ReportModal />)

	const convertReportsData = (annuals: IAnnualReport[]): IRow[] => {
		return Object.values(annuals)
			.filter(annual => annual.company.inn === currentCompany?.inn)
			.map(annual => ({
				_id: annual._id.toString(),
				data: [
					convertTypeReport(annual.type),
					convertTimestampToDate(+annual.updatedAt)
				]
			}))
	}

	return (
		<div className={cn(styles.container, 'introAnchor')}>
			<div className={styles.headingContainer}>
				<Heading
					title='Отчеты об исполнении сметы'
					className={styles.heading}
				/>
			</div>
			<AddReportBtn onClick={handleAdd} />
			<Table
				titles={['Наименование', 'Дата изменения']}
				rows={convertReportsData(annuals)}
				columnWidths={[5, 5]}
				onClick={handleOpenReport}
				height={85}
			/>
			<Intro />
		</div>
	)
}
export default AnnualReports
