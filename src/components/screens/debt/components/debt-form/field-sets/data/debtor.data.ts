import {
	TypeCounterParty,
	TypeIdentifier
} from '~/shared/types/debts/counter-party.interface'
import { TypeCourt } from '~/shared/types/debts/court.interface'
import { TypeDebtDirection } from '~/shared/types/debts/debt.interface'

import {
	extractSelectorOptionsFromEnum,
	generateEnumKeyMap
} from '~/utils/enum/enum.utils'

export const entityDebtorInputs = {
	inn: 'ИНН',
	ogrn: 'ОГРН',
	name: 'Наименование',
	address: 'Юридический адрес',
	leader_post: 'Должность руководителя',
	leader_name: 'ФИО руководителя'
}

export const individualDebtorInputs = {
	name: 'ФИО',
	birthDate: 'Дата рождения (Если известна)',
	birthPlace: 'Место рождения (Если известно)',
	livingAddress: 'Адрес регистрации'
}

export const pseudoBooleanOptions = [
	{ id: 'yes', label: 'Да' },
	{ id: 'no', label: 'Нет' }
]

export const CounterPartyTypes = generateEnumKeyMap(TypeCounterParty)
export const individualIdentifiersOptions =
	extractSelectorOptionsFromEnum(TypeIdentifier)
export const debtorTypeOptions =
	extractSelectorOptionsFromEnum(TypeCounterParty)
export const courtTypeOptions = extractSelectorOptionsFromEnum(TypeCourt)
export const debtDirectionOptions =
	extractSelectorOptionsFromEnum(TypeDebtDirection)
