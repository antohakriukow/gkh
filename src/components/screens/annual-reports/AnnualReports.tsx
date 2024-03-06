import ReportModal from './add-report-modal/AddReportModal'
import cn from 'clsx'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Heading, Table } from '~/components/ui'
import { IRow } from '~/components/ui/table/table.interface'

import { useData } from '~/hooks/useData'
import { useModal } from '~/hooks/useModal'
import { useTypedSelector } from '~/hooks/useTypedSelector'

import Intro from '~/shared/Intro'
import { IAnnualReport } from '~/shared/types/annual.interface'

import { getAnnualReportStructureName } from '~/utils/annual.utils'
import { convertTypeReport } from '~/utils/report.utils'
import { convertTimestampToDate } from '~/utils/time.utils'

import styles from './AnnualReports.module.scss'

const AnnualReports: FC = () => {
	const { annuals, payments } = useData()
	const { currentCompany } = useTypedSelector(state => state.ui)
	const { showModal } = useModal()
	const navigate = useNavigate()

	const handleOpenReport = (reportId: string) => {
		const annualReportInDB = reportId
			? annuals.find(
					annualReport => annualReport._id.toString() === reportId.toString()
			  )
			: null

		let step = 'data-uploader'

		if (
			annualReportInDB?.data.settings?.structure === 'cash/partners' ||
			annualReportInDB?.data.settings?.structure === 'accruals/services'
		) {
			step = 'preview'
		}
		if (annualReportInDB?.data.settings?.structure === 'cash/services') {
			step = 'categories-setter'
		}

		navigate(`/annual-reports/edit/${reportId}/${step}`)
	}

	const handleAdd = () =>
		showModal(<ReportModal handleOpenReport={handleOpenReport} />)

	const convertReportsData = (annuals: IAnnualReport[]): IRow[] => {
		return Object.values(annuals)
			.filter(annual => annual.company.inn === currentCompany?.inn)
			.map(annual => ({
				_id: annual._id.toString(),
				data: [
					convertTypeReport(annual.type),
					getAnnualReportStructureName(annual.data?.settings?.structure) ??
						'Не выбран',
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

	return (
		<div className={cn(styles.container, 'introAnchor')}>
			<div className={styles.headingContainer}>
				<Heading
					title='Отчеты об исполнении сметы'
					className={styles.heading}
				/>
			</div>
			<Button onClick={handleAdd}>Создать отчет</Button>
			<Table
				titles={['Наименование', 'Шаблон', 'Дата изменения', 'Статус оплаты']}
				rows={convertReportsData(annuals)}
				columnWidths={[5, 4, 3, 3]}
				onClick={handleOpenReport}
				height={85}
			/>
			<Intro />
		</div>
	)
}
export default AnnualReports
