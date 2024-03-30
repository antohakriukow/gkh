import CompanyRow from './CompanyRow'
import ServiceRow from './ServiceRow'
import { FC, useState } from 'react'

import { Cell, CellWithToggle } from '../../../shared'
import styles from '../../../shared/table-parts/table.module.scss'
import { IRowProps } from '../table.interface'
import { useBankCashServicesTable } from '../useBankCashServicesTable'

const TotalRow: FC<IRowProps> = ({ operations, category, isReportPayed }) => {
	const [isVisible, setIsVisible] = useState(false)
	const {
		getGroupedByCompaniesOutgoingOperations,
		getGroupedByCompaniesIncomingOperations,
		totalCosts,
		getCategoryOperations
	} = useBankCashServicesTable(operations)

	const toggleVisible = () => setIsVisible(!isVisible)
	const otherCreditOperationsCategoryId = '10001'

	return (
		<>
			<div className={styles.row} style={{ fontWeight: 600 }}>
				<CellWithToggle isActive={isVisible} toggleActive={toggleVisible} />
				<Cell text={category.value} />
				<Cell number={category.amount} isReportPayed={isReportPayed} />
				<Cell
					number={category.calculatedIncome}
					isReportPayed={isReportPayed}
				/>
				<Cell number={+totalCosts} isReportPayed={isReportPayed} />
			</div>
			{isVisible && (
				<>
					{category.children
						? category.children.map(cat => (
								<ServiceRow
									key={cat.id}
									category={cat}
									operations={getCategoryOperations(cat)}
									isReportPayed={isReportPayed}
								/>
						  ))
						: Object.values(
								category.id === otherCreditOperationsCategoryId
									? getGroupedByCompaniesIncomingOperations()
									: getGroupedByCompaniesOutgoingOperations()
						  ).map(group => (
								<CompanyRow
									key={group.name}
									group={group}
									isReportPayed={isReportPayed}
								/>
						  ))}
				</>
			)}
		</>
	)
}

export default TotalRow
