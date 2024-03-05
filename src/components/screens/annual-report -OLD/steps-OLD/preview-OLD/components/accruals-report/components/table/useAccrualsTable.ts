import { IAccountData, ICompanyOperations, TypeLevel } from './table.interface'

import {
	IExtendedAccountingOperation,
	IExtendedBankOperation
} from '~/shared/types/annual.interface'

export const useAccrualsTable = () => {
	const getSubAccountsByLevel = (
		operations: IExtendedAccountingOperation[],
		type: 'debit' | 'credit',
		level: TypeLevel
	): string[] => {
		const uniqueSubAccounts = new Set<string>()
		const isDebit = type === 'debit'

		operations.forEach(op => {
			// Добавляем значения в зависимости от уровня
			switch (level) {
				case 0:
					isDebit
						? uniqueSubAccounts.add(op.debitAccount)
						: uniqueSubAccounts.add(op.creditAccount)
					break
				case 1:
					isDebit
						? uniqueSubAccounts.add(op.debitSubaccount1)
						: uniqueSubAccounts.add(op.creditSubaccount1)
					break
				case 2:
					isDebit
						? uniqueSubAccounts.add(op.debitSubaccount2)
						: uniqueSubAccounts.add(op.creditSubaccount2)
					break
				case 3:
					isDebit
						? uniqueSubAccounts.add(op.debitSubaccount3)
						: uniqueSubAccounts.add(op.creditSubaccount3)
					break
			}
		})

		return Array.from(uniqueSubAccounts)
	}

	const removeDuplicatedValues = (array: string[]) => Array.from(new Set(array))

	const isAccrual = (
		op: IExtendedAccountingOperation,
		accountsNumbers: string[]
	) => accountsNumbers.includes(op.creditAccount)

	const isCost = (
		op: IExtendedAccountingOperation,
		accountsNumbers: string[]
	) => accountsNumbers.includes(op.debitAccount)

	const getDebitKey = (
		level: TypeLevel,
		operation: IExtendedAccountingOperation
	) => {
		switch (level) {
			case 0:
				return operation.debitAccount
			case 1:
				return operation.debitSubaccount1
			case 2:
				return operation.debitSubaccount2
			case 3:
				return operation.debitSubaccount3
		}
	}

	const getCreditKey = (
		level: TypeLevel,
		operation: IExtendedAccountingOperation
	) => {
		switch (level) {
			case 0:
				return operation.creditAccount
			case 1:
				return operation.creditSubaccount1
			case 2:
				return operation.creditSubaccount2
			case 3:
				return operation.creditSubaccount3
		}
	}

	const getAccountsData = (
		operations: IExtendedAccountingOperation[],
		accountsNumbers: string[],
		level: TypeLevel
	): IAccountData[] => {
		const subAccountsGroups = [] as IAccountData[]

		const accruals = operations.filter(op => isAccrual(op, accountsNumbers))
		const costs = operations.filter(op => isCost(op, accountsNumbers))

		removeDuplicatedValues([
			...getSubAccountsByLevel(costs, 'debit', level),
			...getSubAccountsByLevel(accruals, 'credit', level)
		]).forEach(account => {
			const filteredOperations = operations.filter(op => {
				switch (level) {
					case 0:
						return op.debitAccount === account || op.creditAccount === account
					case 1:
						return (
							op.debitSubaccount1 === account ||
							op.creditSubaccount1 === account
						)
					case 2:
						return (
							op.debitSubaccount2 === account ||
							op.creditSubaccount2 === account
						)
					case 3:
						return (
							op.debitSubaccount3 === account ||
							op.creditSubaccount3 === account
						)
				}
			})

			subAccountsGroups.push({
				operations: filteredOperations,
				accruals: filteredOperations.reduce(
					(sum: number, op: IExtendedAccountingOperation) =>
						isAccrual(op, accountsNumbers) ? sum + op.amount : sum,
					0
				),
				costs: filteredOperations.reduce(
					(sum: number, op: IExtendedAccountingOperation) =>
						isCost(op, accountsNumbers) ? sum + op.amount : sum,
					0
				),
				account
			})
		})

		return subAccountsGroups.sort((a, b) =>
			(a.account ?? '').localeCompare(b.account ?? '')
		)
	}

	return {
		getSubAccountsByLevel,
		removeDuplicatedValues,
		getAccountsData
	}
}
