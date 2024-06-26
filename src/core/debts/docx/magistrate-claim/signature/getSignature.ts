import { now } from '~/core/debts/utils'

import { IDebt } from '~/shared/types/debts/debt.interface'

import { setText } from '../../docx.utils'

export const getSignature = (debt: IDebt) => [
	setText(`${debt.collector.leader_post}`),
	setText(`${debt.collector.name}`),
	setText(`${debt.collector.leader_name} / ____________________`),
	setText(now)
]
