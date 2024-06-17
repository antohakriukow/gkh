import { getBody } from './getBody'
import { getHeaders } from './getHeaders'
import { getSignature } from './getSignature'
import { getTitle } from './magistrate.title'

import { IDebt } from '~/shared/types/debts/debt.interface'

export const getMagistrateClaimContent = (debt: IDebt) => {
	const content = [
		getHeaders(debt),
		getTitle(),
		getBody(debt),
		getSignature(debt)
	]

	return content
}
