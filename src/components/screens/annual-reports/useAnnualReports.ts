import { useNavigate } from 'react-router-dom'
import {
	useAnnualReportsData,
	useAnnualReportsKeys,
	useCompaniesData,
	useModal,
	usePaymentsData,
	useTypedSelector
} from '~/hooks'

import { IRow } from '~/components/ui/table/table.interface'

import { IAnnualReportDetails } from '~/shared/types/annual.interface'

import { getAnnualReportStructureName } from '~/utils/annual.utils'
import { convertTypeReport } from '~/utils/report.utils'
import { convertTimestampToDate } from '~/utils/time.utils'

export const useAnnualReports = () => {
	const { companies, isLoading: isCompaniesLoading } = useCompaniesData()
	const { keys } = useAnnualReportsKeys()
	const { annualsDetails, isLoading: isAnnualsDetailsLoading } =
		useAnnualReportsData(keys)
	const { payments } = usePaymentsData()
	const { showModal } = useModal()
	const navigate = useNavigate()
	const { currentCompany } = useTypedSelector(state => state.ui)

	const tableTitles = [
		'Наименование',
		'Шаблон',
		'Дата изменения',
		'Статус оплаты'
	]
	const tableColumnWidths = [5, 4, 3, 3]

	const ANNUAL_TITLE = 'Отчеты об исполнении сметы'
	const CREATE_ANNUAL = 'Создать отчет об исполнении сметы'
	const CREATE_COMPANY = 'Добавить компанию'
	const NOT_SELECTED = 'Не выбран'
	const PAID = 'Оплачен'
	const NOT_PAID = 'Не оплачен'

	const handleOpenReport = (reportId: string) => {
		if (!reportId) return
		const reportDetails =
			annualsDetails.find(
				annualReport => String(annualReport?._id) === reportId
			) ?? null

		let step = 'data-uploader'

		if (
			reportDetails?.structure === 'cash/partners' ||
			reportDetails?.structure === 'accruals/services'
		)
			step = 'preview'

		if (reportDetails?.structure === 'cash/services') step = 'categories-setter'

		navigate(`/annual-reports/edit/${reportId}/${step}`)
	}

	const convertReportsData = (
		annualsDetails: IAnnualReportDetails[]
	): IRow[] => {
		return Object.values(annualsDetails)
			.filter(annual => annual?.inn === currentCompany?.inn)
			.map(annual => ({
				_id: String(annual._id),
				data: [
					convertTypeReport(annual.type),
					getAnnualReportStructureName(annual?.structure) ?? NOT_SELECTED,
					convertTimestampToDate(+annual.updatedAt),
					payments.some(
						payment =>
							payment.type === 'annual' &&
							payment.instanceId === annual._id.toString()
					)
						? PAID
						: NOT_PAID
				]
			}))
	}

	return {
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
	}
}
