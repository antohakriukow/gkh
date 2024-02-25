import CompanyRow from './CompanyRow'
import ServiceRow from './ServiceRow'
import { FC, Fragment, useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'

import { formatNumber } from '~/utils/number.utils'

import { IRow } from '../table.interface'
import styles from '../table.module.scss'
import { useBankCashServicesTable } from '../useBankCashServicesTable'

const TotalRow: FC<IRow> = ({ operations, category }) => {
	const [isVisible, setIsVisible] = useState(false)
	const {
		getGroupedByCompaniesOutgoingOperations,
		getGroupedByCompaniesIncomingOperations,
		totalCosts,
		getCategoryOperations
	} = useBankCashServicesTable(operations)

	const toggleVisible = () => setIsVisible(!isVisible)

	return (
		<Fragment>
			<div
				className={`${styles.gridRow} ${styles.operationRow}`}
				style={{ fontWeight: 600 }}
			>
				<div onClick={toggleVisible}>
					{isVisible ? <FaMinus /> : <FaPlus />}
				</div>
				<div>{category.value}</div>
				<div>{formatNumber(category.amount)}</div>
				<div>{formatNumber(category.calculatedIncome)}</div>
				<div>
					{formatNumber(totalCosts) !== '0,00' ? formatNumber(totalCosts) : ''}
				</div>
			</div>
			{isVisible && (
				<Fragment>
					{category.children
						? category.children.map(cat => (
								<ServiceRow
									category={cat}
									operations={getCategoryOperations(cat)}
								/>
						  ))
						: Object.values(
								category.id === 10001
									? getGroupedByCompaniesIncomingOperations()
									: getGroupedByCompaniesOutgoingOperations()
						  ).map(group => <CompanyRow group={group} />)}
				</Fragment>
			)}
		</Fragment>
	)
}

export default TotalRow
