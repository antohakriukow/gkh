import CashServicesTable from './table/CashServicesTable'
import MainCashServicesTable from './table/MainCashServicesTable'
import { FC } from 'react'

import { SubHeading } from '~/components/ui'

import {
	IExtendedBankOperation,
	TypeCategoriesMap,
	TypeDefinedAnnualDirection
} from '~/shared/types/annual.interface'

import { getAnnualDirectionTitle } from '~/utils/annual.utils'

import { useCashPartnersReport } from '../cash-partners-report/useCashPartnersReport'
import styles from '../shared/table-parts/table.module.scss'

const CashServicesReport: FC<{
	operations: IExtendedBankOperation[]
	categories: TypeCategoriesMap
}> = ({ operations, categories }) => {
	const { sortedKeys, groupedOperations } = useCashPartnersReport(operations)

	return (
		<div className={styles.container}>
			{sortedKeys.map(key => {
				const [direction, account] = key.split('-')
				const directionTitle = account.startsWith('42')
					? 'Депозит'
					: getAnnualDirectionTitle(direction as TypeDefinedAnnualDirection)
				return (
					<div key={key}>
						<SubHeading title={`${directionTitle} - Счет: ${account}`} />
						{direction === 'main' ? (
							<MainCashServicesTable
								operations={groupedOperations[key]}
								categories={
									categories[direction as TypeDefinedAnnualDirection] ?? []
								}
							/>
						) : (
							<CashServicesTable
								operations={groupedOperations[key]}
								categories={
									categories[direction as TypeDefinedAnnualDirection] ?? []
								}
							/>
						)}
					</div>
				)
			})}
		</div>
	)
}

export default CashServicesReport
