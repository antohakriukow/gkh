import Group from './components/Group'
import { IOperationGroup } from './table.interface'
import { useBankOperationsTable } from './useBankOperationsTable'
import cn from 'clsx'
import { FC, Fragment } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'

import { IExtendedBankOperation } from '~/shared/types/annual.interface'

import { formatNumber } from '~/utils/number.utils'

import styles from './table.module.scss'

const BankOperationsTable: FC<{ operations: IExtendedBankOperation[] }> = ({
	operations
}) => {
	const { groupedOperations, toggleGroup } = useBankOperationsTable(operations)

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
						<div>{total > 0 ? formatNumber(total) : ''}</div>
						<div>{total < 0 ? formatNumber(-total) : ''}</div>
					</div>
					{expanded &&
						Object.entries(groups).map(([groupKey, group]) => (
							<Group
								key={groupKey}
								groupKey={groupKey}
								group={group as IOperationGroup}
							/>
						))}
				</Fragment>
			))}
		</div>
	)
}

export default BankOperationsTable
