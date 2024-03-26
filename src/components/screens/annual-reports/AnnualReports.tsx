import ReportModal from './add-report-modal/AddReportModal'
import cn from 'clsx'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import Introduction from '~/components/intro/Introduction'
import { Button, Heading, Table } from '~/components/ui'
import { IRow } from '~/components/ui/table/table.interface'

import { useAnnualReportsData } from '~/hooks/firebase-hooks/useAnnualReportsData'
import { useAnnualReportsKeys } from '~/hooks/firebase-hooks/useAnnualReportsKeys'
import { useCompaniesData } from '~/hooks/firebase-hooks/useCompaniesData'
import { usePaymentsData } from '~/hooks/firebase-hooks/usePaymentsData'
import { useModal } from '~/hooks/useModal'
import { useTypedSelector } from '~/hooks/useTypedSelector'

import { IAnnualReportDetails } from '~/shared/types/annual.interface'

import { getAnnualReportStructureName } from '~/utils/annual.utils'
import { convertTypeReport } from '~/utils/report.utils'
import { convertTimestampToDate } from '~/utils/time.utils'

import AddCompanyModal from '../reports/modals/add-company-modal/AddCompanyModal'

import styles from './AnnualReports.module.scss'

const AnnualReports: FC = () => {
	const { companies, isLoading: isCompaniesLoading } = useCompaniesData()
	const { keys } = useAnnualReportsKeys()
	const { annualsDetails, isLoading: isAnnualsDetailsLoading } =
		useAnnualReportsData(keys)
	const { payments } = usePaymentsData()
	const { showModal } = useModal()
	const navigate = useNavigate()
	const { currentCompany } = useTypedSelector(state => state.ui)

	const handleOpenReport = (reportId: string) => {
		const reportDetails = reportId
			? annualsDetails.find(
					annualReport => String(annualReport?._id) === reportId
			  )
			: null

		let step = 'data-uploader'

		if (
			reportDetails?.structure === 'cash/partners' ||
			reportDetails?.structure === 'accruals/services'
		) {
			step = 'preview'
		}
		if (reportDetails?.structure === 'cash/services') {
			step = 'categories-setter'
		}

		navigate(`/annual-reports/edit/${reportId}/${step}`)
	}

	const handleAddCompany = () => showModal(<AddCompanyModal />)

	const handleAddReport = () =>
		showModal(<ReportModal handleOpenReport={handleOpenReport} />)

	const convertReportsData = (
		annualsDetails: IAnnualReportDetails[]
	): IRow[] => {
		return Object.values(annualsDetails)
			.filter(annual => annual?.inn === currentCompany?.inn)
			.map(annual => ({
				_id: String(annual._id),
				data: [
					convertTypeReport(annual.type),
					getAnnualReportStructureName(annual?.structure) ?? 'Не выбран',
					convertTimestampToDate(+annual.updatedAt),
					payments.some(
						payment =>
							payment.type === 'annual' &&
							payment.instanceId === annual._id.toString()
					)
						? 'Оплачен'
						: 'Не оплачен'
				]
			}))
	}

	// if (isAnnualsDetailsLoading) return <Loader />

	return (
		<div className={cn(styles.container, 'introAnchor')}>
			<div className={styles.headingContainer}>
				<Heading
					title='Отчеты об исполнении сметы'
					className={styles.heading}
				/>
			</div>
			{!!companies && companies.length > 0 ? (
				<Button onClick={handleAddReport}>
					Создать отчет об исполнении сметы
				</Button>
			) : (
				<Button
					className={cn('addReportButtonAnchor')}
					onClick={handleAddCompany}
				>
					Добавить компанию
				</Button>
			)}
			{!!annualsDetails && annualsDetails.length > 0 && (
				<Table
					titles={['Наименование', 'Шаблон', 'Дата изменения', 'Статус оплаты']}
					rows={convertReportsData(annualsDetails)}
					columnWidths={[5, 4, 3, 3]}
					onClick={handleOpenReport}
					height={85}
				/>
			)}
			<Introduction />
		</div>
	)
}
export default AnnualReports
