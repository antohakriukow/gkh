import CompanyRow from './CompanyRow'
import cn from 'clsx'
import { FC, Fragment, useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'

import {
	formatNumber,
	replaceAmountWithFakeIfFalse
} from '~/utils/number.utils'

import { IAccountRow } from '../table.interface'
import styles from '../table.module.scss'
import { useBankCashServicesTable } from '../useBankCashServicesTable'

const AccountRow: FC<IAccountRow> = ({
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
				<div>
					<p className={cn(styles.value, { [styles.blurred]: !isReportPayed })}>
						{replaceAmountWithFakeIfFalse(
							formatNumber(accruals),
							isReportPayed
						)}
					</p>
				</div>
				<div>
					<p className={cn(styles.value, { [styles.blurred]: !isReportPayed })}>
						{replaceAmountWithFakeIfFalse(formatNumber(income), isReportPayed)}
					</p>
				</div>
				<div>
					<p className={cn(styles.value, { [styles.blurred]: !isReportPayed })}>
						{replaceAmountWithFakeIfFalse(formatNumber(costs), isReportPayed)}
					</p>
				</div>
			</div>
			{isVisible && (
				<Fragment>
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
				</Fragment>
			)}
		</Fragment>
	)
}
export default AccountRow
