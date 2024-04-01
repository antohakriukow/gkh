import {
	IAnnualCategory,
	IExtendedBankOperation
} from '~/shared/types/annual.interface'

import {
	groupOperationsByRecipientName,
	sortOperationsGroupsArrayByRecipientName
} from '~/utils/annual.utils'

const otherDebitOperationsCategoryId = '10000'

export const getGroupedOperations = (
	operations: IExtendedBankOperation[],
	category: IAnnualCategory
) => {
	if (category.children) return []
	const filteredOperations =
		category.id === otherDebitOperationsCategoryId
			? operations
			: operations.filter(
					operation => operation.categoryId === category.id.toString()
			  )
	return sortOperationsGroupsArrayByRecipientName(
		groupOperationsByRecipientName(filteredOperations)
	)
}
