import AddCompanyModal from './modals/add-company-modal/AddCompanyModal'
import cn from 'clsx'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import ReportModal from '~/components/screens/reports/modals/add-report-modal/AddReportModal'
import { Button, Heading, Loader, Table } from '~/components/ui'
import { IRow } from '~/components/ui/table/table.interface'

import { useCompaniesData } from '~/hooks/firebase-hooks/useCompaniesData'
import { useReportsData } from '~/hooks/firebase-hooks/useReportsData'
import { useModal } from '~/hooks/useModal'
import { useTypedSelector } from '~/hooks/useTypedSelector'

import Intro from '~/shared/Intro'
import { IReport } from '~/shared/types/report.interface'

import { convertPeriod, convertTypeReport } from '~/utils/report.utils'
import { convertTimestampToDate } from '~/utils/time.utils'

import styles from './Reports.module.scss'

const Reports: FC = () => {
	const { reports, isLoading: isReportsLoading } = useReportsData()
	const { companies, isLoading: isCompaniesLoading } = useCompaniesData()
	const { currentCompany } = useTypedSelector(state => state.ui)
	const { showModal } = useModal()
	const navigate = useNavigate()

	const handleOpenReport = (reportId: string) => {
		navigate(`/reports/edit/${reportId}`)
	}

	const handleAddReport = () =>
		showModal(<ReportModal handleOpenReport={handleOpenReport} />)

	const handleAddCompany = () => showModal(<AddCompanyModal />)

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

	if (isReportsLoading || isCompaniesLoading)
		return <Loader loaderType='small' />

	return (
		<div className={cn(styles.container, 'introAnchor')}>
			<div className={styles.headingContainer}>
				<Heading title='Отчеты 22-ЖКХ' className={styles.heading} />
			</div>
			{!!companies && companies.length > 0 ? (
				<Button onClick={handleAddReport}>Создать отчет</Button>
			) : (
				<Button
					className={cn('addReportButtonAnchor')}
					onClick={handleAddCompany}
				>
					Добавить компанию
				</Button>
			)}
			{!!reports && reports.length > 0 && (
				<Table
					titles={['Наименование', 'Период', 'Дата изменения']}
					rows={convertReportsData(reports)}
					columnWidths={[5, 5, 5]}
					onClick={handleOpenReport}
					height={90}
				/>
			)}
			<Intro />
		</div>
	)
}
export default Reports
