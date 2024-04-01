import {
	IExtendedBankOperation,
	TypeAnnualDirection
} from '~/shared/types/annual.interface'

import { TypeGroupedOperations } from '../shared/types'

export const useCashPartnersReport = (operations: IExtendedBankOperation[]) => {
	const groupOperationsByDirectionAndAccount = (
		operations: IExtendedBankOperation[]
	): TypeGroupedOperations => {
		const grouped: TypeGroupedOperations = {}
		operations.forEach(operation => {
			const accountKey =
				operation.amount > 0
					? operation.recipientAccount
					: operation.payerAccount
			const directionKey = `${operation.direction}-${accountKey}`
			if (!grouped[directionKey]) {
				grouped[directionKey] = []
			}
			grouped[directionKey].push(operation)
		})
		return grouped
	}

	const groupedOperations = groupOperationsByDirectionAndAccount(operations)
	const preferredOrder = ['main', 'commerce', 'target', 'renovation']

	const sortedKeys = Object.keys(groupedOperations).sort((a, b) => {
		const directionA = a.split('-')[0] as TypeAnnualDirection
		const directionB = b.split('-')[0] as TypeAnnualDirection
		const indexA = preferredOrder.indexOf(directionA ?? '')
		const indexB = preferredOrder.indexOf(directionB ?? '')
		if (indexA !== -1 || indexB !== -1) {
			if (indexA === -1) return 1
			if (indexB === -1) return -1
			return indexA - indexB
		}
		return 0
	})

	return { groupedOperations, sortedKeys }
}
