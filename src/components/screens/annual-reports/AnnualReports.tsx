import ReportModal from './add-report-modal/AddReportModal'
import { useAnnualReports } from './useAnnualReports'
import cn from 'clsx'
import { FC } from 'react'

import Introduction from '~/components/intro/Introduction'
import { AddCompanyModal } from '~/components/shared'
import { Button, Heading, Loader, Table } from '~/components/ui'

import styles from './AnnualReports.module.scss'

const AnnualReports: FC = () => {
	const {
		isCompaniesLoading,
		isAnnualsDetailsLoading,
		companies,
		annualsDetails,
		tableTitles,
		tableColumnWidths,
		showModal,
		handleOpenReport,
		convertReportsData,

		ANNUAL_TITLE,
		CREATE_ANNUAL,
		CREATE_COMPANY
	} = useAnnualReports()

	const handleAddCompany = () => showModal(<AddCompanyModal />)
	const handleAddReport = () =>
		showModal(<ReportModal handleOpenReport={handleOpenReport} />)

	if (isCompaniesLoading || isAnnualsDetailsLoading) return <Loader />

	return (
		<div className={cn(styles.container, 'introAnchor')}>
			<div className={styles.headingContainer}>
				<Heading title={ANNUAL_TITLE} className={styles.heading} />
			</div>
			{!!companies && companies.length > 0 ? (
				<Button onClick={handleAddReport}>{CREATE_ANNUAL}</Button>
			) : (
				<Button
					className={cn('addReportButtonAnchor')}
					onClick={handleAddCompany}
				>
					{CREATE_COMPANY}
				</Button>
			)}
			{!!annualsDetails && annualsDetails.length > 0 && (
				<Table
					titles={tableTitles}
					rows={convertReportsData(annualsDetails)}
					columnWidths={tableColumnWidths}
					onClick={handleOpenReport}
					height={85}
				/>
			)}
			<Introduction />
		</div>
	)
}
export default AnnualReports
