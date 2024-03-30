import AccountRow from './components/AccountRow'
import Header from './components/Header'
import { ICashServicesTableProps } from './table.interface'
import { useBankCashServicesTable } from './useBankCashServicesTable'
import cn from 'clsx'
import { FC } from 'react'

import { useAnnualReport } from '~/components/screens/annual-report/useAnnualReport'

import styles from '../../shared/table-parts/table.module.scss'

const CashServicesTable: FC<ICashServicesTableProps> = ({
	operations,
	categories
}) => {
	const { incomingOperationsWithTagTotalSum, totalIncome, totalCosts } =
		useBankCashServicesTable(operations)
	const { isReportPayed } = useAnnualReport()

	if (!operations || operations.length === 0) return null

	const totalAccruals = categories.reduce(
		(sum, cat) => sum + (cat.amount ?? 0),
		0
	)

	return (
		<div className={cn(styles.table, styles.fiveColumnsGrid)}>
			<Header />
			<AccountRow
				operations={operations}
				accruals={totalAccruals.toFixed(2)}
				income={Number(
					+totalIncome + +incomingOperationsWithTagTotalSum
				).toFixed(2)}
				costs={totalCosts}
				isReportPayed={isReportPayed}
				isMain={false}
			/>
		</div>
	)
}

export default CashServicesTable
