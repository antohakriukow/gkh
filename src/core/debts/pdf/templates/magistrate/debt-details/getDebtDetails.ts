import { getDebtDetailsTitle, getDebtsTable } from './utils'
import { now } from '~/core/debts/utils'

import { IDebt } from '~/shared/types/debts/debt.interface'

import { getMonthName } from '~/utils/period.utils'

import {
	convertToRoubles,
	setBoldText,
	setEmptyRow,
	setText
} from '../../../pdf.utils'

export const getDebtDetails = (debt: IDebt) => ({
	stack: [
		getDebtDetailsTitle(debt),
		setEmptyRow(),
		setBoldText(`Адрес: ${debt.address.house}, ${debt.address.room}`),
		getDebtsTable(debt),
		setEmptyRow(),
		setEmptyRow(),
		setText(
			`Сумма задолженности, подлежащая взысканию: ${convertToRoubles(
				+debt.main.total + +debt.penalties.total
			)}`
		),
		setText(
			`(сумма основного долга ${convertToRoubles(
				debt.main.total
			)} + пени ${convertToRoubles(
				debt.penalties.total
			)}, рассчитанные на ${now} на сумму задолженности с ${getMonthName(
				debt.main.data.at(0)!.period.month
			)} ${debt.main.data.at(0)!.period.year} по ${getMonthName(
				debt.main.data.at(-1)!.period.month
			)} ${debt.main.data.at(-1)!.period.year}`
		),
		setText(
			`Госпошлина, подлежащая взысканию: ${convertToRoubles(
				(+debt.duty.value).toFixed(2)
			)}`
		),
		setText(`(${debt.duty.formula})`),
		setEmptyRow()
	]
})
