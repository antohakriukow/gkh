import ReportFooter from './components/ReportFooter'
import ReportHeader from './components/ReportHeader'
import CashServicesTable from './components/table/CashServicesTable'
import MainCashServicesTable from './components/table/MainCashServicesTable'
import { FC } from 'react'
import { getAnnualDirectionTitle } from '~/core/annual/shared'

import { SubHeading } from '~/components/ui'

import {
	IAnnualCategory,
	IExtendedBankOperation,
	TypeAnnualDirection,
	TypeCategoriesMap,
	TypeDefinedAnnualDirection
} from '~/shared/types/annual.interface'
import { ICompany } from '~/shared/types/company.interface'

import styles from './CashServicesReport.module.scss'

type GroupedOperations = {
	[key: string]: IExtendedBankOperation[]
}

const groupOperationsByDirectionAndAccount = (
	operations: IExtendedBankOperation[]
): GroupedOperations => {
	const grouped: GroupedOperations = {}
	operations.forEach(operation => {
		const accountKey =
			operation.amount > 0 ? operation.recipientAccount : operation.payerAccount
		const directionKey = `${operation.direction}-${accountKey}`
		if (!grouped[directionKey]) {
			grouped[directionKey] = []
		}
		grouped[directionKey].push(operation)
	})
	return grouped
}

const CashServicesReport: FC<{
	operations: IExtendedBankOperation[]
	categories: TypeCategoriesMap
	company: ICompany
}> = ({ operations, company, categories }) => {
	const groupedOperations = groupOperationsByDirectionAndAccount(operations)
	const preferredOrder = ['main', 'commerce', 'target', 'renovation']

	// Получаем ключи, отсортированные согласно preferredOrder
	const sortedKeys = Object.keys(groupedOperations).sort((a, b) => {
		const directionA = a.split('-')[0] as TypeDefinedAnnualDirection
		const directionB = b.split('-')[0] as TypeDefinedAnnualDirection
		const indexA = preferredOrder.indexOf(directionA ?? '')
		const indexB = preferredOrder.indexOf(directionB ?? '')
		if (indexA !== -1 || indexB !== -1) {
			if (indexA === -1) return 1
			if (indexB === -1) return -1
			return indexA - indexB
		}
		return 0
	})

	return (
		<div className={styles.container}>
			<ReportHeader company={company} />
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
								accountNumber={account}
								operations={groupedOperations[key]}
								categories={
									categories[direction as TypeDefinedAnnualDirection] ?? []
								}
							/>
						)}
					</div>
				)
			})}
			<ReportFooter company={company} />
		</div>
	)
}

export default CashServicesReport
