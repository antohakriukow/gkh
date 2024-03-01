import CompanyRow from './CompanyRow'
import { FC, Fragment, useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'

import { formatNumber } from '~/utils/number.utils'

import { IAccountRow } from '../table.interface'
import styles from '../table.module.scss'
import { useBankCashServicesTable } from '../useBankCashServicesTable'

const AccountRow: FC<IAccountRow> = ({
	accruals,
	income,
	costs,
	operations
}) => {
	const [isVisible, setIsVisible] = useState(false)
	const { getGroupedByCompaniesOutgoingOperations } =
		useBankCashServicesTable(operations)

	const toggleVisible = () => setIsVisible(!isVisible)

	const hasOutgoingOperations =
		operations.filter(operation => operation.amount < 0).length > 0

	return (
		<Fragment>
			<div className={styles.gridRow} style={{ fontWeight: 600 }}>
				{hasOutgoingOperations ? (
					<div onClick={toggleVisible}>
						{isVisible ? <FaMinus /> : <FaPlus />}
					</div>
				) : (
					<div />
				)}
				<div>Доходы и расходы, всего:</div>
				<div>{formatNumber(accruals)}</div>
				<div>{formatNumber(income)}</div>
				<div>{formatNumber(costs)}</div>
			</div>
			{isVisible && (
				<Fragment>
					{Object.values(getGroupedByCompaniesOutgoingOperations()).map(
						group => (
							<CompanyRow group={group} />
						)
					)}
				</Fragment>
			)}
		</Fragment>
	)
}
export default AccountRow
