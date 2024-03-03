import {
	TypeAnnualDirection,
	TypeAnnualOperationTag
} from '~/shared/types/annual.interface'

export interface IAnnualOperationTagData {
	title: string
	value: TypeAnnualOperationTag
}

const commercialIncome = {
	title: 'Доходы от аренды',
	value: 'commercialIncome'
} as IAnnualOperationTagData
const percents = {
	title: 'Проценты по депозитам',
	value: 'percents'
} as IAnnualOperationTagData
const fkr = {
	title: 'Поступления от ФКР',
	value: 'fkr'
} as IAnnualOperationTagData
const partnerCashback = {
	title: 'Возвраты от поставщиков',
	value: 'partnerCashback'
} as IAnnualOperationTagData
const internal = {
	title: 'Переводы между счетами',
	value: 'internal'
} as IAnnualOperationTagData
const other = {
	title: 'Прочие поступления',
	value: 'other'
} as IAnnualOperationTagData

export const getAnnualTagVariationsData = (
	direction: TypeAnnualDirection
): IAnnualOperationTagData[] => {
	switch (direction) {
		case 'main':
			return [commercialIncome, percents, partnerCashback, internal, other]
		case 'commerce':
			return [commercialIncome, percents, partnerCashback, internal, other]
		case 'renovation':
			return [percents, fkr, partnerCashback, internal, other]
		case 'target':
			return [percents, partnerCashback, internal, other]
		default:
			return [commercialIncome, percents, partnerCashback, internal, other]
	}
}
