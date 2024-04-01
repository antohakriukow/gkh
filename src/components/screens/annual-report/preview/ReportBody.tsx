import CashPartnersReport from './cash-partners-report/CashPartnersReport'
import CashServicesReport from './cash-services-report/CashServicesReport'
import { FC } from 'react'

import { Loader } from '~/components/ui'

import {
	IAnnualReport,
	TypeCategoriesMap
} from '~/shared/types/annual.interface'

const ReportBody: FC<{
	annualReportInDB: IAnnualReport | null | undefined
}> = ({ annualReportInDB }) => {
	if (!annualReportInDB?.data?.bankOperations) return null

	const isCashPartnersStructure =
		annualReportInDB?.data?.settings?.structure === 'cash/partners'
	const isCashServicesStructure =
		annualReportInDB?.data?.settings?.structure === 'cash/services'

	if (isCashPartnersStructure) {
		return (
			<CashPartnersReport operations={annualReportInDB?.data?.bankOperations} />
		)
	}

	if (isCashServicesStructure) {
		return (
			<CashServicesReport
				categories={
					(annualReportInDB?.data.categories ?? []) as TypeCategoriesMap
				}
				operations={annualReportInDB?.data?.bankOperations}
			/>
		)
	}

	return <Loader loaderType='small' />
}
export default ReportBody
