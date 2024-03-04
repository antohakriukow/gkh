import ReportFooter from './components/ReportFooter'
import ReportHeader from './components/ReportHeader'
import AccrualsTable from './components/table/AccrualsTable'
import { FC } from 'react'

import {
	IAccount,
	IExtendedAccountingOperation,
	TypeAnnualDirection
} from '~/shared/types/annual.interface'
import { ICompany } from '~/shared/types/company.interface'

import Operation from '../../../debit-sorter/components/Operation'

import styles from './AccrualsReport.module.scss'

const AccrualsReport: FC<{
	operations: IExtendedAccountingOperation[]
	accounts: IAccount[]
	company: ICompany
}> = ({ operations, accounts, company }) => {
	return (
		<div className={styles.container}>
			<ReportHeader company={company} />
			{(['main', 'target', 'renovation'] as TypeAnnualDirection[]).map(
				direction => (
					<AccrualsTable
						operations={operations.filter(
							Operation => Operation.direction === direction
						)}
						direction={direction}
						accounts={accounts.filter(acc => acc.type === direction)}
					/>
				)
			)}
			<ReportFooter company={company} />
		</div>
	)
}
export default AccrualsReport
