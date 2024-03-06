import CompanyRow from './CompanyRow'
import ServiceRow from './ServiceRow'
import cn from 'clsx'
import { FC, Fragment, useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'

import {
	formatNumber,
	replaceAmountWithFakeIfFalse
} from '~/utils/number.utils'

import { IRow } from '../table.interface'
import styles from '../table.module.scss'
import { useBankCashServicesTable } from '../useBankCashServicesTable'

const TotalRow: FC<IRow> = ({ operations, category, isReportPayed }) => {
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
				<div>
					<p className={cn(styles.value, { [styles.blurred]: !isReportPayed })}>
						{replaceAmountWithFakeIfFalse(
							formatNumber(category.amount),
							isReportPayed
						)}
					</p>
				</div>
				<div>
					<p className={cn(styles.value, { [styles.blurred]: !isReportPayed })}>
						{replaceAmountWithFakeIfFalse(
							formatNumber(category.calculatedIncome),
							isReportPayed
						)}
					</p>
				</div>
				<div>
					<p className={cn(styles.value, { [styles.blurred]: !isReportPayed })}>
						{formatNumber(totalCosts) !== '0,00'
							? replaceAmountWithFakeIfFalse(
									formatNumber(totalCosts),
									isReportPayed
							  )
							: ''}
					</p>
				</div>
			</div>
			{isVisible && (
				<Fragment>
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
								category.id === '10001'
									? getGroupedByCompaniesIncomingOperations()
									: getGroupedByCompaniesOutgoingOperations()
						  ).map(group => (
								<CompanyRow
									key={group.name}
									group={group}
									isReportPayed={isReportPayed}
								/>
						  ))}
				</Fragment>
			)}
		</Fragment>
	)
}

export default TotalRow
