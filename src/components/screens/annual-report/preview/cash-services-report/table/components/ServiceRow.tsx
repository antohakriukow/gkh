import CompanyRow from './CompanyRow'
import { FC, useState } from 'react'

import { Cell, CellWithToggle } from '../../../shared'
import styles from '../../../shared/table-parts/table.module.scss'
import { IRowProps } from '../table.interface'
import { useBankCashServicesTable } from '../useBankCashServicesTable'

const ServiceRow: FC<IRowProps> = ({ operations, category, isReportPayed }) => {
	const [isVisible, setIsVisible] = useState(false)
	const { totalCosts, getGroupedByCompaniesOutgoingOperations } =
		useBankCashServicesTable(operations)
	const toggleVisible = () => setIsVisible(!isVisible)

	return (
		<>
			<div className={styles.row}>
				<CellWithToggle isActive={isVisible} toggleActive={toggleVisible} />
				<Cell text={category.value} />
				<Cell
					number={category.amount}
					isReportPayed={isReportPayed}
					showEmptyCellWhen={!category.amount}
				/>
				<Cell
					number={category.calculatedIncome}
					isReportPayed={isReportPayed}
				/>
				<Cell number={Number(totalCosts)} isReportPayed={isReportPayed} />
			</div>
			{isVisible && (
				<>
					{Object.values(getGroupedByCompaniesOutgoingOperations()).map(
						group => (
							<CompanyRow
								key={group.name}
								group={group}
								isReportPayed={isReportPayed}
							/>
						)
					)}
				</>
			)}
		</>
	)
}
export default ServiceRow
