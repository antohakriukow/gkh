import { getBody } from './body/getBody'
import { getDebtDetails } from './debt-details/getDebtDetails'
import { getHeaders } from './headers/getHeaders'
import { getTitle } from './magistrate.title'
import { getPenaltiesDetails } from './penalties-details/getPenaltiesDetails'
import { getSignature } from './signature/getSignature'

import { IDebt } from '~/shared/types/debts/debt.interface'

export const getMagistrateClaimContent = (debt: IDebt) => {
	const content = [
		getHeaders(debt),
		getTitle(),
		getBody(debt),
		getSignature(debt),
		getDebtDetails(debt),
		getSignature(debt),
		getPenaltiesDetails(debt)
	]

	return content
}
