import { now } from '~/core/debts/utils'

import { IDebt } from '~/shared/types/debts/debt.interface'

import { setText } from '../../../pdf.utils'

export const getSignature = (debt: IDebt) => ({
	stack: [
		setText(`${debt.collector.leader_post}`),
		setText(`${debt.collector.name}`),
		setText(`${debt.collector.leader_name} / ____________________`),
		setText(now)
	]
})
