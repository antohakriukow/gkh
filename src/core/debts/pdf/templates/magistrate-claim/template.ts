import { getBody } from './body/getBody'
import { getHeaders } from './headers/getHeaders'
import { getTitle } from './title/getTitle'

import { IDebt } from '~/shared/types/debts/debt.interface'

import { getSignature } from '../shared/signature/getSignature'

export const magistrateClaimTemplate = (debt: IDebt) => [
	getHeaders(debt),
	getTitle(),
	getBody(debt),
	{ stack: getSignature(debt) }
]
