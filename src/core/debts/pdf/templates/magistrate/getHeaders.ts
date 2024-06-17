import {
	CounterPartyTypes,
	IEntity,
	IIndividual,
	TypeIdentifier
} from '~/shared/types/debts/counter-party.interface'
import { IDebt, TypeDebtDirection } from '~/shared/types/debts/debt.interface'

import { getEnumValue } from '~/utils/enum/enum.utils'

import {
	convertToRoubles,
	setBoldText,
	setEmptyRow,
	setText
} from '../../pdf.utils'

const getMainDebtString = (
	debt: IDebt
) => `Пени за просрочку исполнения обязательств по
оплате ${
	debt?.options?.direction === 'ЖКУ' ? 'ЖКУ' : 'взносов на капремонт'
}: ${debt.penalties.total}`

const getIndividualData = (debt: IDebt) => {
	if (debt.debtor.type !== CounterPartyTypes.individual) return []

	const individualData = debt.debtor.data as IIndividual

	return [
		setText(individualData.name),
		setText(`Дата рождения: ${individualData.birthDate || 'Неизвестно'}`),
		setText(`Место рождения: ${individualData.birthPlace || 'Неизвестно'}`),
		setText(`Адрес проживания: ${debt.address.house}, ${debt.address.room}`),
		setText(
			`${getEnumValue(TypeIdentifier, individualData.identifier.type)}: ${
				individualData.identifier.value
			}`
		)
	]
}

const getEntityData = (debt: IDebt) => {
	if (debt.debtor.type !== CounterPartyTypes.entity) return []

	const individualData = debt.debtor.data as IEntity

	return [
		setText(individualData.name),
		setText(`ИНН: ${individualData.inn}`),
		setText(`ОГРН: ${individualData.ogrn}`),
		setText(`Юридический адрес: ${individualData.address}`)
	]
}

const setDebtorData = (debt: IDebt) =>
	debt.debtor.type === CounterPartyTypes.individual
		? getIndividualData(debt)
		: getEntityData(debt)

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
				...setDebtorData(debt),
				setEmptyRow(),
				setBoldText(
					`Адрес помещения: ${debt.address.house}, ${debt.address.room}`
				),
				setEmptyRow(),
				setText(`Сумма задолженности: ${convertToRoubles(debt.main.total)}`),
				setText(convertToRoubles(getMainDebtString(debt))),
				setText(`Госпошлина: ${convertToRoubles(debt.duty ?? 0.0)}`),
				setEmptyRow()
			],
			alignment: 'right',
			bold: false,
			width: '60%'
		}
	]
})
