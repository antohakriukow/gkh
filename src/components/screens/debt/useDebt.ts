import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { calculateDuty } from '~/core/debts/calculateDuty'
import { calculatePenalties } from '~/core/debts/calculatePenalties'
import { downloadPDF } from '~/core/debts/pdf/pdf.download'
import { useAuth, useSingleDebtData } from '~/hooks'

import { CourtTypes } from '~/shared/types/debts/court.interface'
import { IDebt, TypeDebtDirection } from '~/shared/types/debts/debt.interface'

import { DebtService } from '~/services/debt.service'

import { calculateTotalDebt } from '~/utils/debt/debt'
import { generateEnumKeyMap } from '~/utils/enum/enum.utils'

export const useDebt = () => {
	const navigate = useNavigate()
	const { user } = useAuth()
	const { debtId } = useParams<{ debtId: string }>()
	const { debt, isLoading } = useSingleDebtData(debtId as string)
	const formMethods = useForm<IDebt>({
		mode: 'onSubmit',
		defaultValues: debt,
		reValidateMode: 'onSubmit'
	})

	// const isReadyToCalculate =
	// 	!formMethods.formState.isDirty && formMethods.formState.isValid

	// const isReadyToDownload = Boolean(
	// 	debt?.duty && !formMethods.formState.isDirty
	// )

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
		finalData.penalties = {
			data: penalties,
			total: calculateTotalDebt(penalties)
		}
		finalData.main.total = calculateTotalDebt(finalData.main.data)
		finalData.duty = calculateDuty(
			+calculateTotalDebt(finalData.main.data) +
				+calculateTotalDebt(finalData.penalties.data),
			data.court.type === CourtTypes.magistrate
		)

		try {
			const updatedDebt = await DebtService.update(
				user?.uid,
				debt._id,
				finalData
			)
			downloadPDF(updatedDebt)
		} catch (error) {
			console.log('error: ', error)
		}
	}

	useEffect(() => {
		if (debt && !isLoading) {
			formMethods.reset(debt)
		}
	}, [debt, isLoading, formMethods])

	return {
		isLoading,
		navigateToDebts,
		handleDeleteDebt,
		saveDebt,
		formMethods
	}
}
