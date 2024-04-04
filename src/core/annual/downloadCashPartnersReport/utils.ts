import {
	IAccount,
	IExtendedBankOperation,
	TypeAnnualDirection
} from '~/shared/types/annual.interface'

import { trimStringAtSymbol } from '~/utils/string/utils'

export interface IOperationGroup {
	name: string
	INN: string
	operations: IExtendedBankOperation[]
	total: number
}

export interface IGroupedOperations {
	[key: string]: {
		total: number
		groups: Record<string, IOperationGroup>
	}
}

export const directions = [
	'main',
	'target',
	'commerce',
	'renovation'
] as TypeAnnualDirection[]

export const getAccountsInDirection = (
	accounts: IAccount[],
	direction: TypeAnnualDirection
) => accounts.filter(account => account.type === direction)

export const getGroupedOperations = (
	operations: IExtendedBankOperation[]
): IGroupedOperations => {
	return operations.reduce<IGroupedOperations>((acc, operation) => {
		const typeKey = operation.amount > 0 ? 'incoming' : 'outgoing'
		const INN =
			operation.amount > 0 ? operation.payerINN : operation.recipientINN
		const groupKey = INN

		if (!acc[typeKey]) {
			acc[typeKey] = {
				total: 0,
				groups: {}
			}
		}

		if (!acc[typeKey].groups[groupKey]) {
			acc[typeKey].groups[groupKey] = {
				name:
					operation.amount > 0 ? operation.payerName : operation.recipientName,
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

export const filterOperationsByAccount = (
	groupedOperations: IGroupedOperations,
	accountNumber: string
): IGroupedOperations => {
	const filtered: IGroupedOperations = {
		incoming: { total: 0, groups: {} },
		outgoing: { total: 0, groups: {} }
	}

	// Перебираем ключи incoming и outgoing
	Object.keys(groupedOperations).forEach((typeKey: string) => {
		const operationType = groupedOperations[typeKey]
		Object.entries(operationType.groups).forEach(([groupKey, group]) => {
			// Фильтруем операции в группе по условию с номером счета
			const filteredOperations = group.operations.filter(operation =>
				operation.amount > 0
					? operation.recipientAccount === accountNumber
					: operation.payerAccount === accountNumber
			)

			// Если после фильтрации остались операции, добавляем их в результат
			if (filteredOperations.length > 0) {
				const totalAmount = filteredOperations.reduce(
					(acc, operation) => acc + operation.amount,
					0
				)
				if (!filtered[typeKey].groups[groupKey]) {
					filtered[typeKey].groups[groupKey] = {
						name: group.name,
						INN: group.INN,
						operations: filteredOperations,
						total: totalAmount
					}
				} else {
					filtered[typeKey].groups[groupKey].operations.push(
						...filteredOperations
					)
					filtered[typeKey].groups[groupKey].total += totalAmount
				}
				filtered[typeKey].total += totalAmount
			}
		})
	})

	return filtered
}

export const tableHeader = ['Контрагент', 'Доходы, руб.', 'Расходы, руб.']

export const getAccountRow = (
	operations: IGroupedOperations,
	account: IAccount
) => [
	`Счет  № ${account.number}`,
	operations.incoming.total !== 0 ? operations.incoming.total : '',
	operations.outgoing.total !== 0 ? operations.outgoing.total : ''
]

export const getTotalOperationsRow = (operations: {
	total: number
	groups: Record<string, IOperationGroup>
}) => [
	`${operations.total > 0 ? 'Доходы' : 'Расходы'}, всего`,
	operations.total > 0 ? operations.total : '',
	operations.total > 0 ? '' : operations.total
]

export const getCompanyRow = (companyName: string, totalAmount: number) => [
	trimStringAtSymbol(companyName, '//'),
	totalAmount > 0 ? totalAmount : '',
	totalAmount < 0 ? totalAmount : ''
]

export const getOperationRow = (operation: IExtendedBankOperation) => [
	operation.paymentPurpose,
	operation.amount > 0 ? operation.amount : '',
	operation.amount > 0 ? '' : operation.amount
]
//
