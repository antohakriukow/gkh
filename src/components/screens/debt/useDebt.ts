import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { calculatePenalties } from '~/core/debts/calculatePenalties'
import { useAuth, useSingleDebtData, useWindowWidth } from '~/hooks'

import { IDebt, TypeDebtDirection } from '~/shared/types/debts/debt.interface'

import { DebtService } from '~/services/debt.service'

import { calculateTotalDebt } from '~/utils/debt/debt'
import { generateEnumKeyMap } from '~/utils/enum/enum.utils'

export const useDebt = () => {
	const navigate = useNavigate()
	const { user } = useAuth()
	const { debtId } = useParams<{ debtId: string }>()
	const { debt, isLoading: isInitialDataLoading } = useSingleDebtData(
		debtId as string
	)

	const [isLoading, setIsLoading] = useState(isInitialDataLoading)
	const { width } = useWindowWidth()
	const isNarrow = width < 500

	const formMethods = useForm<IDebt>({
		mode: 'onSubmit',
		defaultValues: debt,
		reValidateMode: 'onSubmit'
	})

	const debtDirectionTypes = generateEnumKeyMap(TypeDebtDirection)

	const navigateToDebts = useCallback(() => navigate(`/debts`), [navigate])

	const handleDeleteDebt = useCallback(async () => {
		if (!user || !debt._id) return

		try {
			await DebtService.remove(user?.uid, debt._id)
			navigateToDebts()
		} catch (error) {
			console.log('error: ', error)
		}
	}, [debt._id, user, navigateToDebts])

	const saveDebt = async (data: IDebt) => {
		if (!user || !debt._id) return

		const finalData = JSON.parse(JSON.stringify(data))
		const isMain = data.options.direction === debtDirectionTypes.maintenance
		const penalties = calculatePenalties(data.main.data, isMain)
		if (finalData.options.withPenalties === 'yes') {
			finalData.penalties = {
				data: penalties,
				total: calculateTotalDebt(penalties)
			}
		}
		finalData.main.total = calculateTotalDebt(finalData.main.data)

		console.log(finalData)

		try {
			await DebtService.update(user?.uid, debt._id, finalData)
		} catch (error) {
			console.log('error: ', error)
		}
	}

	return {
		navigateToDebts,
		handleDeleteDebt,
		saveDebt,
		formMethods
	}
}
