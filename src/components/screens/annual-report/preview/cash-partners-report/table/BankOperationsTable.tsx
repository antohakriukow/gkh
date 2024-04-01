import Group from './components/Group'
import Header from './components/Header'
import ResultRow from './components/ResultRow'
import { IBankOperationsTableProps, IOperationGroup } from './table.interface'
import { useBankOperationsTable } from './useBankOperationsTable'
import cn from 'clsx'
import { FC, Fragment } from 'react'

import { useAnnualReport } from '~/components/screens/annual-report/useAnnualReport'

import styles from '../../shared/table-parts/table.module.scss'

const BankOperationsTable: FC<IBankOperationsTableProps> = ({ operations }) => {
	const { groupedOperations, toggleGroup } = useBankOperationsTable(operations)
	const { isReportPayed } = useAnnualReport()

	return (
		<div className={cn(styles.table, styles.fourColumnsGrid)}>
			<Header />
			{groupedOperations.map(({ typeKey, total, groups, expanded }) => (
				<Fragment key={typeKey}>
					<ResultRow
						toggleGroup={toggleGroup}
						isReportPayed={isReportPayed}
						typeKey={typeKey}
						total={total}
						expanded={expanded}
					/>
					{expanded &&
						Object.entries(groups).map(([groupKey, group]) => (
							<Group
								key={groupKey}
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
