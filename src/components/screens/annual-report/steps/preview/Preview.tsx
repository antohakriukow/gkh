import AccrualsReport from './components/accruals-report/AccrualsReport'
import CashPartnersReport from './components/cash-partners-report/CashPartnersReport'
import CashServicesReport from './components/cash-services-report/CashServicesReport'
import { FC } from 'react'

import { Loader } from '~/components/ui'

import { TypeCategoriesMap } from '~/shared/types/annual.interface'

import { useAnnualReport } from '../../useAnnualReport'

const Preview: FC = () => {
	const { annualReportInDB } = useAnnualReport()

	if (!annualReportInDB || !annualReportInDB.data) return null

	if (
		!!annualReportInDB.data.bankOperations &&
		annualReportInDB.data.settings?.structure === 'cash/partners'
	) {
		return (
			<CashPartnersReport
				company={annualReportInDB.company}
				operations={annualReportInDB?.data?.bankOperations}
			/>
		)
	}

	if (
		!!annualReportInDB.data.bankOperations &&
		annualReportInDB.data.settings?.structure === 'cash/services'
	) {
		return (
			<CashServicesReport
				categories={
					(annualReportInDB?.data.categories ?? []) as TypeCategoriesMap
				}
				company={annualReportInDB.company}
				operations={annualReportInDB?.data?.bankOperations}
			/>
		)
	}

	if (!!annualReportInDB?.data?.accountingOperations)
		return (
			<AccrualsReport
				operations={annualReportInDB?.data?.accountingOperations}
				accounts={annualReportInDB?.data?.accounts ?? []}
				company={annualReportInDB.company}
			/>
		)

	return <Loader />
}
export default Preview
