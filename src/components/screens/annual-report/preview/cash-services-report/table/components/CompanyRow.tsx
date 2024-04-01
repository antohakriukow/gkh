import Row from './Row'
import { FC, useState } from 'react'

import { Cell, CellWithToggle } from '../../../shared'
import styles from '../../../shared/table-parts/table.module.scss'
import { ICompanyRowProps } from '../table.interface'
import { useBankCashServicesTable } from '../useBankCashServicesTable'

const CompanyRow: FC<ICompanyRowProps> = ({ group, isReportPayed }) => {
	const { name, operations } = group
	const [isVisible, setIsVisible] = useState(false)
	const {} = useBankCashServicesTable(operations)
	const toggleVisible = () => setIsVisible(!isVisible)

	const totalPositive = operations
		.filter(operation => operation.amount > 0)
		.reduce((sum, operation) => sum + operation.amount, 0)

	const totalNegative = operations
		.filter(operation => operation.amount < 0)
		.reduce((sum, operation) => sum + operation.amount, 0)

	return (
		<>
			<div className={styles.row}>
				<CellWithToggle isActive={isVisible} toggleActive={toggleVisible} />
				<Cell text={name} />
				<Cell />
				<Cell
					number={totalPositive}
					isReportPayed={isReportPayed}
					showEmptyCellWhen={totalPositive === 0}
				/>
				<Cell
					number={totalNegative}
					isReportPayed={isReportPayed}
					showEmptyCellWhen={totalNegative === 0}
				/>
			</div>
			{isVisible && (
				<>
					{operations.map(operation => (
						<Row
							key={operation._id}
							operation={operation}
							isReportPayed={isReportPayed}
						/>
					))}
				</>
			)}
		</>
	)
}
export default CompanyRow
