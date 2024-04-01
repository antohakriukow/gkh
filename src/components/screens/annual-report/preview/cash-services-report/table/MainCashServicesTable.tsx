import Header from './components/Header'
import ResultsRow from './components/ResultsRow'
import TotalRow from './components/TotalRow'
import { ICashServicesTableProps } from './table.interface'
import { useBankCashServicesTable } from './useBankCashServicesTable'
import cn from 'clsx'
import { FC } from 'react'

import { useAnnualReport } from '~/components/screens/annual-report/useAnnualReport'

import { IAnnualCategory } from '~/shared/types/annual.interface'

import styles from '../../shared/table-parts/table.module.scss'

const MainCashServicesTable: FC<ICashServicesTableProps> = ({
	operations,
	categories
}) => {
	const {
		outgoingOperationsWithEmptyCategoryId,
		incomingOperationsWithTagTotalSum,
		incomingOperationsWithTag,
		getCategoryOperations,
		totalIncome,
		totalCosts,
		otherIncomeCategory,
		otherCostsCategory
	} = useBankCashServicesTable(operations)
	const { isReportPayed } = useAnnualReport()

	if (!operations || operations.length === 0) return null

	const totalAccruals = categories.reduce(
		(sum, cat) => sum + (cat.amount ?? 0),
		0
	)

	const getCalculatedIncome = (category: IAnnualCategory) =>
		+((Number(totalIncome) * Number(category.amount)) / totalAccruals).toFixed(
			2
		) ?? 0

	const getTotalIncomeMinusSumOfAllOtherIncome = (category: IAnnualCategory) =>
		Number(totalIncome) -
			categories
				.filter(cat => cat.id !== category.id)
				.reduce((sum, cat) => sum + Number(cat.calculatedIncome), 0) ?? 0

	return (
		<div className={cn(styles.table, styles.fiveColumnsGrid)}>
			<Header />
			{categories.map((category, index) => {
				const isLastCategory = index === categories.length - 1

				category.calculatedIncome = isLastCategory
					? getTotalIncomeMinusSumOfAllOtherIncome(category)
					: getCalculatedIncome(category)

				return (
					<TotalRow
						key={index}
						operations={getCategoryOperations(category)}
						category={category}
						isReportPayed={isReportPayed}
					/>
				)
			})}

			{!!incomingOperationsWithTag?.length && (
				<TotalRow
					operations={incomingOperationsWithTag}
					category={otherIncomeCategory}
					isReportPayed={isReportPayed}
				/>
			)}

			{!!outgoingOperationsWithEmptyCategoryId?.length && (
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
