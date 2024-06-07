import { IStep, TypeStep } from './debt.interface'
import { useDebtContext } from './provider/provider'
import { useCallback, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth, useWindowWidth } from '~/hooks'

import { DebtService } from '~/services/debt.service'

export const useDebt = () => {
	const { user } = useAuth()
	const navigate = useNavigate()

	const {
		debtId,
		isLoading,
		step,
		house,
		room,
		debtor,
		main,
		penalties,
		duty,
		setIsLoading,
		setStep,
		setHouse,
		setRoom,
		setDebtor,
		setMain,
		setPenalties,
		setDuty
	} = useDebtContext()
	const { width } = useWindowWidth()
	const isNarrow = width < 500

	const stepOneDone = !!house && !!room

	const navigateToDebts = useCallback(() => navigate(`/debts`), [navigate])

	const handleDeleteDebt = useCallback(async () => {
		if (!user || !debtId) return

		try {
			await DebtService.remove(user?.uid, debtId)
			navigateToDebts()
		} catch (error) {
			console.log('error: ', error)
		}
	}, [debtId, user, navigateToDebts])

	const handleBack = useCallback(() => {
		if (step > 1) setStep((+step - 1) as TypeStep)
	}, [step, setStep])

	const handleNext = useCallback(() => {
		if (step > 0) setStep((step + 1) as TypeStep)
	}, [step, setStep])

	return {
		debtId,
		isLoading,
		isNarrow,
		step,
		house,
		room,
		debtor,
		main,
		penalties,
		duty,
		setIsLoading,
		navigateToDebts,
		handleDeleteDebt,
		setStep,
		setHouse,
		setRoom,
		setDebtor,
		setMain,
		setPenalties,
		setDuty,
		handleBack,
		handleNext,
		stepOneDone
	}
}
