import CompanyRow from './CompanyRow'
import { FC, useState } from 'react'

import { Cell, CellWithToggle } from '../../../shared'
import styles from '../../../shared/table-parts/table.module.scss'
import { IAccountRowProps } from '../table.interface'
import { useBankCashServicesTable } from '../useBankCashServicesTable'

const AccountRow: FC<IAccountRowProps> = ({
	accruals,
	income,
	costs,
	operations,
	isReportPayed,
	isMain
}) => {
	const [isVisible, setIsVisible] = useState(false)
	const {
		getGroupedByCompaniesOutgoingOperations,
		getGroupedByCompaniesIncomingOperations
	} = useBankCashServicesTable(operations)

	const toggleVisible = () => setIsVisible(!isVisible)

	const hasOutgoingOperations =
		operations.filter(operation => operation.amount < 0).length > 0

	return (
		<>
			<div className={styles.row} style={{ fontWeight: 600 }}>
				{hasOutgoingOperations ? (
					<CellWithToggle isActive={isVisible} toggleActive={toggleVisible} />
				) : (
					<div />
				)}
				<Cell text='Доходы и расходы, всего:' />
				<Cell number={+accruals} isReportPayed={isReportPayed} />
				<Cell number={+income} isReportPayed={isReportPayed} />
				<Cell number={+costs} isReportPayed={isReportPayed} />
			</div>
			{isVisible && (
				<>
					{!isMain &&
						Object.values(getGroupedByCompaniesIncomingOperations()).map(
							(group, index) => (
								<CompanyRow
									key={`${group.name}-${index}`}
									group={group}
									isReportPayed={isReportPayed}
								/>
							)
						)}
					{Object.values(getGroupedByCompaniesOutgoingOperations()).map(
						(group, index) => (
							<CompanyRow
								key={`${group.name}-${index}`}
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
export default AccountRow
