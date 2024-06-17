import {
	IDebt,
	IDebtDetails
} from './../../../shared/types/debts/debt.interface'
import { FirebaseError } from 'firebase/app'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	useAuth,
	useCompaniesData,
	useDebtsData,
	useDebtsKeys,
	useTypedSelector
} from '~/hooks'

import { IRow } from '~/components/ui/table/table.interface'

import { showSuccessReportCreatedNotification } from '~/shared/notifications/toast'

import { DebtService } from '~/services/debt.service'

import { calculateTotalDebt, getDebtPeriod } from '~/utils/debt/debt'
import { extractCollectorData } from '~/utils/debt/debt'
import { handleDBErrors } from '~/utils/error/utils'
import { convertTimestampToDate } from '~/utils/time/utils'

export const useDebts = () => {
	const { user } = useAuth()
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)
	const { keys } = useDebtsKeys()
	const { debtsDetails, isLoading: isDebtsLoading } = useDebtsData(keys)
	const { companies, isLoading: isCompaniesLoading } = useCompaniesData()
	const { currentCompany } = useTypedSelector(state => state.ui)

	const ADD_COMPANY = 'Добавить компанию'
	const CREATE_DEBT = 'Создать взыскание'
	const DEBTS = 'Взыскания'
	const tableTitles = [
		'Адрес',
		'Период',
		'Основной долг',
		'Пени',
		'ГП',
		'Дата изменения'
	]
	const tableColumnWidths = [5, 3, 3, 3, 3, 3]

	const handleOpenDebt = (debtId: string) => {
		navigate(`/debts/edit/${debtId}`)
	}

	const handleCreateDebt = async () => {
		if (!currentCompany) return
		setIsLoading(true)
		try {
			if (!user) return
			const debtId = Date.now().toString()
			const data = extractCollectorData(currentCompany)

			await DebtService.create(user.uid, data, debtId)

			const createdDebt = await DebtService.getById(user.uid, debtId)

			if (!!createdDebt) {
				showSuccessReportCreatedNotification()
				handleOpenDebt(debtId)
				return createdDebt
			}

			return {} as IDebt
		} catch (error) {
			if (error instanceof FirebaseError) handleDBErrors(error)
		} finally {
			setIsLoading(false)
		}
	}

	const convertDebtsData = (debts: IDebtDetails[]): IRow[] => {
		return Object.values(debts)
			.filter(debt => debt.collector.inn === currentCompany?.inn)
			.map(debt => ({
				_id: debt._id.toString(),
				data: [
					debt.address.house + ', ' + debt.address.room,
					getDebtPeriod(debt?.main.data),
					debt.main.total ?? '-',
					debt.penalties.total ?? '-',
					debt.duty ?? '-',
					convertTimestampToDate(+debt?.updatedAt)
				]
			}))
	}

	return {
		debtsDetails,
		companies,
		isLoading,
		isCompaniesLoading,
		isDebtsLoading,
		convertDebtsData,
		handleCreateDebt,
		handleOpenDebt,
		ADD_COMPANY,
		CREATE_DEBT,
		DEBTS,
		tableTitles,
		tableColumnWidths
	}
}
