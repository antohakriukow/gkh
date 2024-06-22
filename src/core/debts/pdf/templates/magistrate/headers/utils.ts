import {
	CounterPartyTypes,
	IEntity,
	IIndividual,
	TypeIdentifier
} from '~/shared/types/debts/counter-party.interface'
import { IDebt, isMainDirection } from '~/shared/types/debts/debt.interface'

import { getEnumValue } from '~/utils/enum/enum.utils'

import { setText } from '../../../pdf.utils'

export const getMainDebtString = (
	debt: IDebt
) => `Пени за просрочку исполнения обязательств по
оплате ${
	isMainDirection(debt?.options?.direction) ? 'ЖКУ' : 'взносов на капремонт'
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

export const getDebtorData = (debt: IDebt) =>
	debt.debtor.type === CounterPartyTypes.individual
		? getIndividualData(debt)
		: getEntityData(debt)
