import BankOperationsTable from './table/BankOperationsTable'
import { useCashPartnersReport } from './useCashPartnersReport'
import { FC } from 'react'

import { SubHeading } from '~/components/ui'

import {
	IExtendedBankOperation,
	TypeAnnualDirection
} from '~/shared/types/annual.interface'

import { getAnnualDirectionTitle } from '~/utils/annual/utils'

import styles from '../shared/table-parts/table.module.scss'

const CashPartnersReport: FC<{
	operations: IExtendedBankOperation[]
}> = ({ operations }) => {
	const { sortedKeys, groupedOperations } = useCashPartnersReport(operations)

	return (
		<div className={styles.container}>
			{sortedKeys.map(key => {
				const [direction, account] = key.split('-')
				const directionTitle = account.startsWith('42')
					? 'Депозит'
					: getAnnualDirectionTitle(direction as TypeAnnualDirection)
				return (
					<div key={key}>
						<SubHeading title={`${directionTitle} - Счет: ${account}`} />
						<BankOperationsTable operations={groupedOperations[key]} />
					</div>
				)
			})}
		</div>
	)
}

export default CashPartnersReport
