import { unifyAccountingOperations } from './prepareAccountingData'
import { unifyBankOperations } from './prepareBankData'

import {
	IAnnualCategory,
	IAnnualCategoryState
} from '~/shared/types/annual.interface'

import { AnnualState } from '~/store/annual/annual.interface'

import { IOperation } from '../../shared/types/annual.interface'
import { createDeepCopy } from '../../utils/object.utils'

export const removeCollapsedFromCategories = (
	categories: IAnnualCategoryState[]
): IAnnualCategory[] => {
	return categories.map(({ id, value, collapsed, children, ...rest }) => ({
		id,
		value,
		...(children
			? {
					children: removeCollapsedFromCategories(
						children as IAnnualCategoryState[]
					)
			  }
			: {})
	}))
}

export const prepareAnnualState = (state: AnnualState) => {
	const internalState = createDeepCopy(state)

	internalState.categories = removeCollapsedFromCategories(
		internalState.categories
	)

	if (
		internalState.structure === 'cash/partners' ||
		internalState.structure === 'cash/services'
	)
		internalState.operations = unifyBankOperations(
			internalState.operations,
			internalState.accounts
		)

	if (internalState.structure === 'accruals/services') {
		internalState.operations = unifyAccountingOperations(
			internalState.operations,
			internalState.categories,
			internalState.accounts
		).filter((operation: IOperation) => !!operation.direction)
	}

	return internalState
}
