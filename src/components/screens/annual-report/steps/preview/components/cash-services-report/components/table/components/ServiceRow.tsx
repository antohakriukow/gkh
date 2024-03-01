import CompanyRow from './CompanyRow'
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

const ServiceRow: FC<IRow> = ({ operations, category, isReportPayed }) => {
	const [isVisible, setIsVisible] = useState(false)
	const { totalCosts, getGroupedByCompaniesOutgoingOperations } =
		useBankCashServicesTable(operations)
	const toggleVisible = () => setIsVisible(!isVisible)

	return (
		<Fragment>
			<div className={`${styles.gridRow} ${styles.operationRow}`}>
				<div onClick={toggleVisible}>
					{isVisible ? <FaMinus /> : <FaPlus />}
				</div>
				<div>{category.value}</div>
				<div>
					<p className={cn({ [styles.blurred]: !isReportPayed })}>
						{category.amount
							? replaceAmountWithFakeIfFalse(
									String(category.amount),
									isReportPayed
							  )
							: ''}
					</p>
				</div>
				<div>
					<p className={cn({ [styles.blurred]: !isReportPayed })}>
						{replaceAmountWithFakeIfFalse(
							category.calculatedIncome?.toFixed(2),
							isReportPayed
						)}
					</p>
				</div>
				<div>
					<p className={cn({ [styles.blurred]: !isReportPayed })}>
						{replaceAmountWithFakeIfFalse(
							formatNumber(totalCosts),
							isReportPayed
						)}
					</p>
				</div>
			</div>
			{isVisible && (
				<Fragment>
					{Object.values(getGroupedByCompaniesOutgoingOperations()).map(
						group => (
							<CompanyRow
								key={group.name}
								group={group}
								isReportPayed={isReportPayed}
							/>
						)
					)}
				</Fragment>
			)}
		</Fragment>
	)
}
export default ServiceRow
