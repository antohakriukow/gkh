import {
	IExtendedBankOperation,
	TypeDefinedAnnualDirection
} from '~/shared/types/annual.interface'

import { TypeGroupedOperations } from '../shared/types'

export const useCashServicesReport = (operations: IExtendedBankOperation[]) => {
	const groupOperationsByDirectionAndAccount = (
		operations: IExtendedBankOperation[]
	): TypeGroupedOperations => {
		const grouped: TypeGroupedOperations = {}
		const mainAccounts = new Set<string>()

		operations.forEach(operation => {
			if (operation.direction === 'main') {
				if (operation.amount > 0) {
					mainAccounts.add(operation.recipientAccount)
				} else if (operation.amount < 0) {
					mainAccounts.add(operation.payerAccount)
				}
			} else {
				const accountKey =
					operation.amount > 0
						? operation.recipientAccount
						: operation.payerAccount
				const directionKey = `${operation.direction}-${accountKey}`
				grouped[directionKey] = grouped[directionKey] || []
				grouped[directionKey].push(operation)
			}
		})

		if (mainAccounts.size > 0) {
			const mainKey = `main-${Array.from(mainAccounts).join(', ')}`
			grouped[mainKey] = operations.filter(
				operation => operation.direction === 'main'
			)
		}

		return grouped
	}

	const groupedOperations = groupOperationsByDirectionAndAccount(operations)
	const preferredOrder = ['main', 'commerce', 'target', 'renovation']

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

	return { sortedKeys, groupedOperations }
}
