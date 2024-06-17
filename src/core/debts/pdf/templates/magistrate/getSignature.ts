import { IDebt } from '~/shared/types/debts/debt.interface'

import { getStringDate } from '~/utils/period.utils'

import { setText } from '../../pdf.utils'

const now = getStringDate(new Date())

export const getSignature = (debt: IDebt) => ({
	stack: [
		setText(`${debt.collector.leader_post}`),
		setText(`${debt.collector.name}`),
		setText(`${debt.collector.leader_name} / ____________________`),
		setText(now)
	]
})
