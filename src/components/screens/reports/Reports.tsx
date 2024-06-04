import { useReports } from './useReports'
import cn from 'clsx'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useModal } from '~/hooks'

import Introduction from '~/components/intro/Introduction'
import AddReportModal from '~/components/screens/reports/modals/add-report-modal/AddReportModal'
import { Button, Heading, Loader, Table } from '~/components/ui'

import AddCompanyModal from '../../shared/add-company-modal/AddCompanyModal'

import styles from './Reports.module.scss'

const Reports: FC = () => {
	const {
		isReportsLoading,
		isCompaniesLoading,
		companies,
		reports,
		convertReportsData,

		ADD_COMPANY,
		CREATE_REPORT,
		REPORTS,
		tableTitles,
		tableColumnWidths
	} = useReports()
	const { showModal } = useModal()
	const navigate = useNavigate()

	const handleOpenReport = (reportId: string) => {
		navigate(`/reports/edit/${reportId}`)
	}

	const handleAddReport = () =>
		showModal(<AddReportModal handleOpenReport={handleOpenReport} />)

	const handleAddCompany = () => showModal(<AddCompanyModal />)

	if (isReportsLoading || isCompaniesLoading)
		return <Loader loaderType='small' />

	return (
		<div className={cn(styles.container, 'introAnchor')}>
			<div className={styles.headingContainer}>
				<Heading title={REPORTS} className={styles.heading} />
			</div>
			{!!companies?.length ? (
				<Button title={CREATE_REPORT} onClick={handleAddReport} />
			) : (
				<Button
					title={ADD_COMPANY}
					className='addReportButtonAnchor'
					onClick={handleAddCompany}
				/>
			)}
			{!!reports?.length && (
				<Table
					titles={tableTitles}
					rows={convertReportsData(reports)}
					columnWidths={tableColumnWidths}
					onClick={handleOpenReport}
					height={90}
				/>
			)}
			<Introduction />
		</div>
	)
}
export default Reports
