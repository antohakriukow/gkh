import CompanyRow from './CompanyRow'
import { FC, Fragment, useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'

import { formatNumber } from '~/utils/number.utils'

import { IRow } from '../table.interface'
import styles from '../table.module.scss'
import { useBankOperationsTable } from '../useBankOperationsTable'

const ServiceRow: FC<IRow> = ({ operations, category }) => {
	const [isVisible, setIsVisible] = useState(false)
	const { totalCosts, getGroupedByCompaniesOutgoingOperations } =
		useBankOperationsTable(operations)
	const toggleVisible = () => setIsVisible(!isVisible)

	return (
		<Fragment>
			<div className={`${styles.gridRow} ${styles.operationRow}`}>
				<div onClick={toggleVisible}>
					{isVisible ? <FaMinus /> : <FaPlus />}
				</div>
				<div>{category.value}</div>
				<div>{category.amount}</div>
				<div>{category.calculatedIncome?.toFixed(2)}</div>
				<div>{formatNumber(totalCosts)}</div>
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
export default ServiceRow
