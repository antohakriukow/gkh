import AccrualsReport from './components/accruals-report/AccrualsReport'
import CashReport from './components/cash-report/CashReport'
import { FC } from 'react'

import { Loader } from '~/components/ui'

import { useAnnualReport } from '../../useAnnualReport'

const FinalStep: FC = () => {
	const { annualReportInDB } = useAnnualReport()

	if (!annualReportInDB || !annualReportInDB.data) return null

	console.log('annualReportInDB: ', annualReportInDB)
	if (!!annualReportInDB.data.bankOperations) {
		return (
			<CashReport
				company={annualReportInDB.company}
				operations={annualReportInDB?.data?.bankOperations}
			/>
		)
	}

	if (!!annualReportInDB?.data?.accountingOperations)
		return (
			<AccrualsReport
				operations={annualReportInDB?.data?.accountingOperations}
			/>
		)

	return <Loader />
}
export default FinalStep
