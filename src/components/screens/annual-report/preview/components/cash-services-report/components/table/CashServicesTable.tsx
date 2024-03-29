import AccountRow from './components/AccountRow'
import { useBankCashServicesTable } from './useBankCashServicesTable'
import cn from 'clsx'
import { FC } from 'react'

import { useAnnualReport } from '~/components/screens/annual-report/useAnnualReport'

import {
	IAnnualCategory,
	IExtendedBankOperation
} from '~/shared/types/annual.interface'

import styles from './table.module.scss'

const CashServicesTable: FC<{
	operations: IExtendedBankOperation[]
	categories: IAnnualCategory[]
	accountNumber: string
}> = ({ operations, categories, accountNumber }) => {
	const { incomingOperationsWithTagTotalSum, totalIncome, totalCosts } =
		useBankCashServicesTable(operations)
	const { isReportPayed } = useAnnualReport()

	if (!operations || operations.length === 0) return null

	const totalAccruals = categories.reduce(
		(sum, cat) => sum + (cat.amount ?? 0),
		0
	)

	return (
		<div className={styles.gridTable}>
			<div className={cn(styles.gridRow, styles.gridHeader)}>
				<div></div>
				<div>Услуга</div>
				<div>Начислено</div>
				<div>Доходы</div>
				<div>Расходы</div>
			</div>
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
