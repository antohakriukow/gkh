import { unifyAccountingOperations } from './prepareAccountingData'
import { unifyBankOperations } from './prepareBankData'

import {
	IAnnualCategory,
	IAnnualCategoryState
} from '~/shared/types/annual.interface'

import { GetDateIntervalBoundaries } from '~/utils/time.utils'

import { AnnualState } from '~/store/annual/annual.interface'

import { data } from '../../components/screens/annual-report/steps/initial-step/components/structure-selector/data'
import { IOperation } from '../../shared/types/annual.interface'
import { createDeepCopy } from '../../utils/object.utils'

// export const removeCollapsedFromCategories = (
// 	categories: IAnnualCategoryState[]
// ): IAnnualCategory[] => {
// 	return categories.map(({ id, value, collapsed, children, ...rest }) => ({
// 		id,
// 		value,
// 		...(children
// 			? {
// 					children: removeCollapsedFromCategories(
// 						children as IAnnualCategoryState[]
// 					)
// 			  }
// 			: {})
// 	}))
// }

export const prepareAnnualState = (state: AnnualState) => {
	const internalState = createDeepCopy(state)

	// Удаление свойства 'collapsed' из categories
	// internalState.categories = removeCollapsedFromCategories(
	// 	internalState.categories
	// )

	// Унификация банковских операций
	if (
		internalState.structure === 'cash/partners' ||
		internalState.structure === 'cash/services'
	) {
		internalState.operations = unifyBankOperations(
			internalState.operations,
			internalState.accounts
		)
	}

	// Унификация бухгалтерских операций
	if (internalState.structure === 'accruals/services') {
		internalState.operations = unifyAccountingOperations(
			internalState.operations,
			internalState.categories,
			internalState.accounts
		).filter((operation: IOperation) => !!operation.direction)
	}

	internalState.startDate = GetDateIntervalBoundaries(
		state.operations.map(operation => operation.date)
	).earliest
	internalState.finalDate = GetDateIntervalBoundaries(
		state.operations.map(operation => operation.date)
	).latest

	return internalState
}
