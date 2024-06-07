import { ICompany } from '~/shared/types/company.interface'
import { IAddress, IDebtCreate, IDebtData } from '~/shared/types/debts'

export const calculateTotalDebt = (debts: IDebtData[]) =>
	debts?.reduce((total, debt) => total + +debt.value, 0).toString()

export const getDebtPeriod = (debts: IDebtData[]) =>
	debts
		? `${debts?.at(0)?.period.year}.${debts?.at(0)?.period.month} - ${debts?.at(
				-1
		  )?.period.year}.${debts?.at(-1)?.period.month}`
		: '-'

export const extractCollectorData = (company: ICompany): IDebtCreate => ({
	collector: {
		name: company.name,
		inn: company.inn,
		ogrn: company.ogrn,
		address: company.address,
		leader_post: company.leader_post,
		leader_name: company.leader_name
	}
})

export const getFullAddress = (data: IAddress) =>
	`${data.house.address}, ${data.room}`
