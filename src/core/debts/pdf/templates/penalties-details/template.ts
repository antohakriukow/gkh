import { getPenaltiesDetailsTitle, getPenaltiesTable } from './utils'

import { IDebt } from '~/shared/types/debts/debt.interface'

import { setBoldText, setEmptyRow } from '../../pdf.utils'

export const penaltiesDetailsTemplate = (debt: IDebt) => ({
	pageMargins: [10, 10, 10, 10],
	stack: [
		getPenaltiesDetailsTitle(debt),
		setEmptyRow(),
		setBoldText(`Адрес: ${debt.address.house}, ${debt.address.room}`),
		getPenaltiesTable(debt),
		setEmptyRow(),
		setEmptyRow(),
		setEmptyRow()
	]
})
