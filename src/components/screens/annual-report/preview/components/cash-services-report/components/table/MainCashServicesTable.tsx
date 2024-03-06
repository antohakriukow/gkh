import ResultsRow from './components/ResultsRow'
import TotalRow from './components/TotalRow'
import { useBankCashServicesTable } from './useBankCashServicesTable'
import cn from 'clsx'
import { FC } from 'react'

import { useAnnualReport } from '~/components/screens/annual-report/useAnnualReport'

import {
	IAnnualCategory,
	IExtendedBankOperation
} from '~/shared/types/annual.interface'

import styles from './table.module.scss'

const MainCashServicesTable: FC<{
	operations: IExtendedBankOperation[]
	categories: IAnnualCategory[]
}> = ({ operations, categories }) => {
	const {
		outgoingOperationsWithEmptyCategoryId,
		incomingOperationsWithTagTotalSum,
		incomingOperationsWithTag,
		getCategoryOperations,
		totalIncome,
		totalCosts
	} = useBankCashServicesTable(operations)
	const { isReportPayed } = useAnnualReport()

	if (!operations || operations.length === 0) return null

	const totalAccruals = categories.reduce(
		(sum, cat) => sum + (cat.amount ?? 0),
		0
	)

	const otherIncomeCategory = {
		value: 'Прочие доходы',
		id: '10001',
		calculatedIncome: incomingOperationsWithTagTotalSum
	} as IAnnualCategory

	const otherCostsCategory = {
		value: 'Прочие расходы',
		id: '10002'
	} as IAnnualCategory

	return (
		<div className={styles.gridTable}>
			<div className={cn(styles.gridRow, styles.gridHeader)}>
				<div></div>
				<div>Услуга</div>
				<div>Начислено</div>
				<div>Доходы</div>
				<div>Расходы</div>
			</div>
			{categories.map((category, index) => {
				index === categories.length - 1
					? (category.calculatedIncome =
							+totalIncome -
							categories
								.filter(cat => cat.id !== category.id)
								.reduce((sum, cat) => sum + +Number(cat.calculatedIncome), 0))
					: (category.calculatedIncome = Number(
							(
								(+totalIncome * Number(category.amount)) /
								totalAccruals
							).toFixed(2)
					  ))

				return (
					<TotalRow
						key={index}
						operations={getCategoryOperations(category)}
						category={category}
						isReportPayed={isReportPayed}
					/>
				)
			})}

			{!!incomingOperationsWithTag && !!incomingOperationsWithTag.length && (
				<TotalRow
					operations={incomingOperationsWithTag}
					category={otherIncomeCategory}
					isReportPayed={isReportPayed}
				/>
			)}

			{outgoingOperationsWithEmptyCategoryId &&
				!!outgoingOperationsWithEmptyCategoryId.length && (
					<TotalRow
						operations={outgoingOperationsWithEmptyCategoryId}
						category={otherCostsCategory}
						isReportPayed={isReportPayed}
					/>
				)}

			<ResultsRow
				accruals={totalAccruals.toFixed(2)}
				income={Number(
					+totalIncome + +incomingOperationsWithTagTotalSum
				).toFixed(2)}
				costs={totalCosts}
				isReportPayed={isReportPayed}
			/>
		</div>
	)
}

export default MainCashServicesTable
