import { getDebtorData, getMainDebtString } from './utils'

import { IDebt } from '~/shared/types/debts/debt.interface'

import {
	convertToRoubles,
	setBoldText,
	setEmptyRow,
	setText
} from '../../../pdf.utils'

export const getHeaders = (debt: IDebt) => ({
	columns: [
		{ width: '40%', text: '' },
		{
			stack: [
				setBoldText(debt.court.name),
				setBoldText(debt.court.address),
				setEmptyRow(),
				setBoldText('Взыскатель:'),
				setText(`Наименование: ${debt.collector.name}`),
				setText(`Юридический адрес: ${debt.collector.address}`),
				setText(`ИНН: ${debt.collector.inn}`),
				setEmptyRow(),
				setBoldText('Должник:'),
				...getDebtorData(debt),
				setEmptyRow(),
				setBoldText(
					`Адрес помещения: ${debt.address.house}, ${debt.address.room}`
				),
				setEmptyRow(),
				setText(`Сумма задолженности: ${convertToRoubles(debt.main.total)}`),
				setText(convertToRoubles(getMainDebtString(debt))),
				setText(`Госпошлина: ${convertToRoubles(debt.duty.value ?? 0.0)}`),
				setEmptyRow()
			],
			alignment: 'right',
			bold: false,
			width: '60%'
		}
	]
})
