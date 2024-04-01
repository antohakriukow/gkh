import { ICompanyOperations } from './table.interface'

import {
	IAnnualCategory,
	IExtendedBankOperation
} from '~/shared/types/annual.interface'

export const useBankCashServicesTable = (
	operations: IExtendedBankOperation[]
) => {
	const outgoingOperationsWithEmptyCategoryId =
		operations
			.filter(operation => operation.amount < 0)
			.filter(operation => !operation.categoryId) ?? []

	const incomingOperationsWithTag =
		operations
			.filter(operation => operation.amount > 0)
			.filter(
				operation =>
					operation.tag === 'commercialIncome' ||
					operation.tag === 'percents' ||
					operation.tag === 'partnerCashback' ||
					operation.tag === 'internal' ||
					operation.tag === 'other'
			) ?? []

	const incomingOperationsWithTagTotalSum =
		incomingOperationsWithTag.reduce(
			(acc, operation) => (operation.amount > 0 ? acc + operation.amount : acc),
			0
		) ?? []

	const totalIncome = operations
		.filter(operation => operation.tag === '' || !operation.tag)
		.reduce(
			(acc, operation) => (operation.amount > 0 ? acc + operation.amount : acc),
			0
		)
		.toFixed(2)

	const totalCosts = operations
		.reduce(
			(acc, operation) => (operation.amount < 0 ? acc + operation.amount : acc),
			0
		)
		.toFixed(2)

	const totalOtherCosts = operations
		.filter(operation => operation.tag === '')
		.reduce(
			(acc, operation) => (operation.amount < 0 ? acc + operation.amount : acc),
			0
		)
		.toFixed(2)

	const getCategoryIds = (category: IAnnualCategory): string[] =>
		category.children
			? category.children.reduce((acc: string[], cat: IAnnualCategory) => {
					return acc.concat(getCategoryIds(cat))
			  }, [])
			: [category.id.toString()]

	const getCategoryOperations = (category: IAnnualCategory) =>
		operations.filter(operation =>
			getCategoryIds(category).includes(operation.categoryId)
		)

	const getGroupedByCompaniesOutgoingOperations = () =>
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

	const getGroupedByCompaniesIncomingOperations = () =>
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

	const otherIncomeCategory = {
		value: 'Прочие доходы',
		id: '10001',
		calculatedIncome: incomingOperationsWithTagTotalSum
	} as IAnnualCategory

	const otherCostsCategory = {
		value: 'Прочие расходы',
		id: '10002'
	} as IAnnualCategory

	return {
		outgoingOperationsWithEmptyCategoryId,
		incomingOperationsWithTag,
		incomingOperationsWithTagTotalSum,

		totalIncome,
		totalCosts,
		totalOtherCosts,
		getCategoryOperations,
		getGroupedByCompaniesOutgoingOperations,
		getGroupedByCompaniesIncomingOperations,

		otherIncomeCategory,
		otherCostsCategory
	}
}
