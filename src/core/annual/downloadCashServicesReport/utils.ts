import { ICompanyOperations, IGroupedOperations } from './types'

import {
	IAccount,
	IAnnualCategory,
	IExtendedBankOperation,
	TypeAnnualDirection
} from '~/shared/types/annual.interface'

export const directions = [
	'main',
	'target',
	'commerce',
	'renovation'
] as TypeAnnualDirection[]

export const replaceMainAccountNumbers = (accounts: IAccount[]) =>
	accounts.map(account =>
		account.type === 'main'
			? { ...account, number: 'consolidatedMainAccount' }
			: account
	)

export const replaceAccountNumbersInMainOperations = (
	operations: IExtendedBankOperation[]
) => {
	const mainOperations = operations
		.filter(operation => operation.direction === 'main')
		.map(operation =>
			operation.amount > 0
				? { ...operation, recipientAccount: 'consolidatedMainAccount' }
				: { ...operation, payerAccount: 'consolidatedMainAccount' }
		)

	const otherOperations = operations.filter(
		operation => operation.direction !== 'main'
	)

	return [...mainOperations, ...otherOperations]
}

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

export const getCategoryIds = (category: IAnnualCategory): string[] =>
	category.children
		? category.children.reduce((acc: string[], cat: IAnnualCategory) => {
				return acc.concat(getCategoryIds(cat))
		  }, [])
		: [category.id.toString()]

export const getCategoryOperations = (
	operations: IExtendedBankOperation[],
	category: IAnnualCategory
) =>
	operations.filter(operation =>
		+category.id > 10000
			? operation.categoryId === ''
			: getCategoryIds(category).includes(operation.categoryId)
	)

export const getGroupedByCompaniesOutgoingOperations = (
	operations: IExtendedBankOperation[]
) =>
	operations
		.filter(operation => operation.amount < 0)
		.reduce((acc: ICompanyOperations, operation) => {
			const inn = operation.recipientINN

			if (!acc[inn]) {
				acc[inn] = {
					name: operation.recipientName,
					inn,
					operations: [],
					total: 0
				}
			}

			acc[inn].operations.push(operation)
			acc[inn].total += operation.amount
			return acc
		}, {})

export const getGroupedByCompaniesIncomingOperations = (
	operations: IExtendedBankOperation[]
) =>
	operations
		.filter(operation => operation.amount > 0)
		.reduce((acc: ICompanyOperations, operation) => {
			const inn = operation.payerINN

			if (!acc[inn]) {
				acc[inn] = {
					name: operation.payerName,
					inn,
					operations: [],
					total: 0
				}
			}

			acc[inn].operations.push(operation)
			acc[inn].total += operation.amount
			return acc
		}, {})

export const calculateOperationsSum = (operations: IExtendedBankOperation[]) =>
	operations.reduce((sum, operation) => sum + operation.amount, 0)

export const calculateMainIncomePart = (
	operations: IExtendedBankOperation[],
	category: IAnnualCategory,
	totalAccruals: number
) => {
	const totalIncome = calculateOperationsSum(
		operations.filter(
			op => op.direction === 'main' && op.amount > 0 && op.tag === ''
		)
	)
	const accruals = category.amount ?? 0

	return totalAccruals === 0 ? 0 : (accruals * totalIncome) / totalAccruals
}

// Unused
export const getGroupedOperationsForEachAccount = (
	operations: IExtendedBankOperation[],
	accounts: IAccount[],
	result = {} as { [key: string]: any }
) =>
	accounts.forEach(
		acc =>
			(result[String(acc.number)] = getGroupedOperations(
				operations.filter(op => op.recipientAccount === acc.number)
			))
	)
