import {
	CounterPartyTypes,
	IEntity,
	IIndividual,
	TypeIdentifier
} from '~/shared/types/debts/counter-party.interface'
import { IDebt, isMainDirection } from '~/shared/types/debts/debt.interface'

import { getEnumValue } from '~/utils/enum/enum.utils'

import { setTextRight } from '../../docx.utils'

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
		setTextRight(individualData.name),
		setTextRight(`Дата рождения: ${individualData.birthDate || 'Неизвестно'}`),
		setTextRight(
			`Место рождения: ${individualData.birthPlace || 'Неизвестно'}`
		),
		setTextRight(
			`Адрес проживания: ${debt.address.house}, ${debt.address.room}`
		),
		setTextRight(
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
		setTextRight(individualData.name),
		setTextRight(`ИНН: ${individualData.inn}`),
		setTextRight(`ОГРН: ${individualData.ogrn}`),
		setTextRight(`Юридический адрес: ${individualData.address}`)
	]
}

export const getDebtorData = (debt: IDebt) =>
	debt.debtor.type === CounterPartyTypes.individual
		? getIndividualData(debt)
		: getEntityData(debt)
