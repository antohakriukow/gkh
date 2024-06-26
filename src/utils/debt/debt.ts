import { ICompany } from '~/shared/types/company.interface'
import { TypeIdentifier } from '~/shared/types/debts/counter-party.interface'
import {
	IDebtCreate,
	IDebtData,
	IPenaltyData
} from '~/shared/types/debts/debt.interface'
import { IAddress } from '~/shared/types/debts/house.interface'

import { generateEnumKeyMap } from '../enum/enum.utils'

export const calculateTotalDebt = (debts: (IDebtData | IPenaltyData)[]) =>
	debts?.reduce((total, debt) => total + +debt.value, 0).toFixed(2)

export const getDebtPeriod = (debts: IDebtData[]) =>
	debts
		? `${debts?.at(0)?.period.year}.${debts?.at(0)?.period.month} - ${debts?.at(
				-1
		  )?.period.year}.${debts?.at(-1)?.period.month}`
		: '-'

export const extractCollectorData = (company: ICompany): IDebtCreate => ({
	collector: {
		name: company.name.short ?? company.name.full,
		inn: company.inn,
		kpp: company.kpp,
		ogrn: company.ogrn,
		address: company.address,
		leader_post: company.leader_post,
		leader_name: company.leader_name
	}
})

export const getFullAddress = (data: IAddress) =>
	!!data?.house?.address && data?.room
		? `${data?.house?.address}, ${data?.room}`
		: '-'

export const getIdentifierValueName = (identifierType: TypeIdentifier) => {
	const types = generateEnumKeyMap(TypeIdentifier)

	switch (identifierType) {
		case types.snils:
			return 'Номер'
		case types.inn:
			return 'ИНН'
		case types.ogrnip:
			return 'ОГРНИП'
		default:
			return 'Серия и номер'
	}
}

export const replaceUndefinedAndNaNWithZString = (obj: any): void => {
	Object.keys(obj).forEach(key => {
		if (typeof obj[key] === 'object' && obj[key] !== null) {
			replaceUndefinedAndNaNWithZString(obj[key])
		} else if (
			obj[key] === undefined ||
			(typeof obj[key] === 'number' && Number.isNaN(obj[key]))
		) {
			obj[key] = ''
		}
	})
}
