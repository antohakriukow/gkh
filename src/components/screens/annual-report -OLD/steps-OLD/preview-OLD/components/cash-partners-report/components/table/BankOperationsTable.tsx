import Group from './components/Group'
import { IOperationGroup } from './table.interface'
import { useBankOperationsTable } from './useBankOperationsTable'
import cn from 'clsx'
import { FC, Fragment } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'

import { useAnnualReport } from '~/components/screens/annual-report -OLD/useAnnualReport-OLD'

import { IExtendedBankOperation } from '~/shared/types/annual.interface'

import {
	formatNumber,
	replaceAmountWithFakeIfFalse
} from '~/utils/number.utils'

import styles from './table.module.scss'

const BankOperationsTable: FC<{ operations: IExtendedBankOperation[] }> = ({
	operations
}) => {
	const { groupedOperations, toggleGroup } = useBankOperationsTable(operations)
	const { isReportPayed } = useAnnualReport()

	return (
		<div className={styles.gridTable}>
			<div className={cn(styles.gridRow, styles.gridHeader)}>
				<div></div>
				<div>Контрагент</div>
				<div>Доходы, руб.</div>
				<div>Расходы, руб.</div>
			</div>
			{groupedOperations.map(({ typeKey, total, groups, expanded }) => (
				<Fragment key={typeKey}>
					<div className={styles.gridRow} onClick={() => toggleGroup(typeKey)}>
						<div>{expanded ? <FaMinus /> : <FaPlus />}</div>
						<div className={styles.total}>
							{typeKey === 'incoming' ? 'Доходы' : 'Расходы'}, всего:
						</div>
						<div>
							<p
								className={cn(styles.value, {
									[styles.blurred]: !isReportPayed
								})}
							>
								{total > 0
									? replaceAmountWithFakeIfFalse(
											formatNumber(total),
											isReportPayed
									  )
									: ''}
							</p>
						</div>
						<div>
							<p
								className={cn(styles.value, {
									[styles.blurred]: !isReportPayed
								})}
							>
								{total < 0
									? replaceAmountWithFakeIfFalse(
											formatNumber(-total),
											isReportPayed
									  )
									: ''}
							</p>
						</div>
					</div>
					{expanded &&
						Object.entries(groups).map(([groupKey, group]) => (
							<Group
								key={groupKey}
								groupKey={groupKey}
								group={group as IOperationGroup}
								isReportPayed={isReportPayed}
							/>
						))}
				</Fragment>
			))}
		</div>
	)
}

export default BankOperationsTable
