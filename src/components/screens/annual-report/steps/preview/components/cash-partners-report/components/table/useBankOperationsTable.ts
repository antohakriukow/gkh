import { IGroupedOperations } from './table.interface'
import { useState } from 'react'

import { IExtendedBankOperation } from '~/shared/types/annual.interface'

export const useBankOperationsTable = (
	operations: IExtendedBankOperation[]
) => {
	const [groupedOperations, setGroupedOperations] =
		useState<IGroupedOperations>(() => getGroupedOperations(operations))

	function getGroupedOperations(
		operations: IExtendedBankOperation[]
	): IGroupedOperations {
		return operations.reduce<IGroupedOperations>((acc, operation) => {
			const typeKey = operation.amount > 0 ? 'incoming' : 'outgoing'
			const INN =
				operation.amount > 0 ? operation.payerINN : operation.recipientINN
			const groupKey = INN

			if (!acc[typeKey]) {
				acc[typeKey] = {
					total: 0,
					groups: {},
					expanded: typeKey === 'outgoing' ? true : false
				}
			}

			if (!acc[typeKey].groups[groupKey]) {
				acc[typeKey].groups[groupKey] = {
					name:
						operation.amount > 0
							? operation.payerName
							: operation.recipientName,
					INN: INN,
					operations: [],
					total: 0
				}
			}

			acc[typeKey].groups[groupKey].operations.push(operation)
			acc[typeKey].groups[groupKey].total += operation.amount
			acc[typeKey].total += operation.amount

			return acc
		}, {})
	}

	const sortedAndGroupedOperations = Object.entries(groupedOperations)
		.sort(([typeKeyA], [typeKeyB]) => {
			if (typeKeyA === 'incoming' && typeKeyB === 'outgoing') return -1
			if (typeKeyA === 'outgoing' && typeKeyB === 'incoming') return 1
			return 0
		})
		.map(([typeKey, value]) => ({
			typeKey,
			...value,
			groups: Object.entries(value.groups)
				.sort(
					([, groupA], [, groupB]) =>
						Math.abs(groupB.total) - Math.abs(groupA.total)
				)
				.reduce((acc, [key, group]) => ({ ...acc, [key]: group }), {})
		}))

	const toggleGroup = (groupKey: string) => {
		setGroupedOperations(prev => ({
			...prev,
			[groupKey]: {
				...prev[groupKey],
				expanded: !prev[groupKey].expanded
			}
		}))
	}

	return {
		groupedOperations: sortedAndGroupedOperations,
		toggleGroup
	}
}
