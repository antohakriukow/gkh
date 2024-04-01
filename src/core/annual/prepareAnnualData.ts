import { unifyAccountingOperations } from './prepareAccountingData'
import { unifyBankOperations } from './prepareBankData'

import { AnnualState, IOperation } from '~/shared/types/annual.interface'

import { createDeepCopy } from '~/utils/object.utils'
import { GetDateIntervalBoundaries } from '~/utils/time.utils'

export const prepareAnnualState = (state: AnnualState) => {
	const internalState = createDeepCopy(state)

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
