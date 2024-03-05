import AccountRow from './components/AccountRow'
import { useAccrualsTable } from './useAccrualsTable'
import cn from 'clsx'
import { FC } from 'react'
import { getAnnualDirectionTitle } from '~/core/annual/shared'

import { useAnnualReport } from '~/components/screens/annual-report -OLD/useAnnualReport-OLD'
import { SubHeading } from '~/components/ui'

import {
	IAccount,
	IExtendedAccountingOperation,
	TypeAnnualDirection
} from '~/shared/types/annual.interface'

import styles from './table.module.scss'

const AccrualsTable: FC<{
	operations: IExtendedAccountingOperation[]
	accounts: IAccount[]
	direction: TypeAnnualDirection
}> = ({ operations, accounts, direction }) => {
	const { isReportPayed } = useAnnualReport()
	const { getAccountsData } = useAccrualsTable()
	const accountsNumbers = accounts.map(acc => acc.number)

	if (!operations || operations.length === 0) return null

	const subAccountGroups = getAccountsData(operations, accountsNumbers, 1)

	return (
		<div className={styles.container}>
			<SubHeading title={getAnnualDirectionTitle(direction)} />
			<div className={styles.gridTable}>
				<div className={cn(styles.gridRow, styles.gridHeader)}>
					<div></div>
					<div>Услуга</div>
					<div>Получено услуг от поставщиков, руб</div>
					<div>Начислено собственникам, руб</div>
				</div>
				{subAccountGroups?.map(group => (
					<AccountRow
						key={group.account}
						operations={group.operations}
						accruals={group.accruals}
						costs={group.costs}
						account={group.account}
						isReportPayed={isReportPayed}
						direction={direction}
						accounts={accounts}
						level={1}
					/>
				))}
			</div>
		</div>
	)
}

export default AccrualsTable

// const { incomingOperations, outgoingOperations } = useMemo(() => {
// 	let incomingOperations = [] as IExtendedAccountingOperation[]
// 	let outgoingOperations = [] as IExtendedAccountingOperation[]

// 	operations.forEach(operation => {
// 		operation.amount < 0
// 			? outgoingOperations.push(operation)
// 			: incomingOperations.push(operation)
// 	})

// 	return {
// 		incomingOperations,
// 		outgoingOperations
// 	}
// }, [operations])
