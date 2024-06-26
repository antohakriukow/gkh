import { getDebtorData, getMainDebtString } from './utils'

import { IDebt } from '~/shared/types/debts/debt.interface'

import {
	convertToRoubles,
	setBoldTextRight,
	setEmptyRow,
	setTextRight
} from '../../docx.utils'

export const getHeaders = (debt: IDebt) => [
	setBoldTextRight(debt.court.name),
	setBoldTextRight(debt.court.address),
	setEmptyRow(),
	setBoldTextRight('Взыскатель:'),
	setTextRight(`Наименование: ${debt.collector.name}`),
	setTextRight(`Юридический адрес: ${debt.collector.address}`),
	setTextRight(`ИНН: ${debt.collector.inn}`),
	setEmptyRow(),
	setBoldTextRight('Должник:'),
	...getDebtorData(debt),
	setEmptyRow(),
	setBoldTextRight(
		`Адрес помещения: ${debt.address.house}, ${debt.address.room}`
	),
	setEmptyRow(),
	setTextRight(`Сумма задолженности: ${convertToRoubles(debt.main.total)}`),
	setTextRight(convertToRoubles(getMainDebtString(debt))),
	setTextRight(`Госпошлина: ${convertToRoubles(debt.duty.value ?? 0.0)}`),
	setEmptyRow()
]
