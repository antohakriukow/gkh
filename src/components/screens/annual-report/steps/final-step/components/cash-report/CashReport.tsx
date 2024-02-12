import BankOperationsTable from './table/BankOperationsTable'
import { FC } from 'react'

import { useFinalStep } from '../useFinalStep'

const CashReport: FC = () => {
	const { annualReportInDB } = useFinalStep()
	return (
		<div>
			{/* <BankOperationsTable operations={annualReportInDB?.data.operations} />{' '} */}
		</div>
	)
}
export default CashReport
