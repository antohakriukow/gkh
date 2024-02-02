import { FirebaseError } from 'firebase/app'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useActions } from '~/hooks/useActions'
import { useAuth } from '~/hooks/useAuth'
import { useTypedSelector } from '~/hooks/useTypedSelector'

import { AnnualService } from '~/services/annual.service'

import { getAnnualCategoriesGraph } from '~/utils/annual.utils'
import { handleDBErrors } from '~/utils/error.utils'

export const useStepOne = () => {
	const { user } = useAuth()
	const navigate = useNavigate()
	const { currentAnnualReport } = useTypedSelector(state => state.ui)
	const annualState = useTypedSelector(state => state.annual)
	const annualActions = useActions()
	const [isLoading, setIsLoading] = useState(false)
	const [initialStep, setInitialStep] = useState(0)

	const closeReport = useCallback(() => navigate(`/annual-reports`), [navigate])

	useEffect(() => {
		if (!currentAnnualReport?.data?.settings) return
		const settings = currentAnnualReport?.data?.settings
		if (!!settings.structure && !!settings.dataUploaded)
			return setInitialStep(2)
		if (!!settings.structure) return setInitialStep(1)
		setInitialStep(0)
	}, [currentAnnualReport?.data?.settings])

	const handleSaveAnnualReportStructure = () => {
		try {
			if (!user?.uid || !currentAnnualReport?._id || !annualState?.structure)
				return

			setIsLoading(true)
			AnnualService.updateSettings(
				user.uid,
				currentAnnualReport._id.toString(),
				{
					structure: annualState.structure
				}
			)
		} catch (error) {
			if (error instanceof FirebaseError) handleDBErrors(error)
		} finally {
			setIsLoading(false)
		}
	}

	const clearAccountsAndOperations = () => {
		annualActions.setAnnualAccounts([])
		annualActions.setAnnualOperations([])
		annualActions.setAnnualFileNames([])
	}

	const setInitialCategories = () => {
		if (annualState.structure === 'accruals/services') {
			const categories = getAnnualCategoriesGraph(annualState)
			annualActions.setAnnualCategories(categories)
		}
	}

	const clearError = () => annualActions.setAnnualError('')
	const clearAccountTypes = () =>
		annualActions.setAnnualAccounts(
			annualState.accounts.map(account => ({ ...account, type: undefined }))
		)

	// const handleSaveAnnualReportInitialData = () => {
	// 	try {
	// 		if (!user?.uid || !currentAnnualReport?._id || !annualState?.structure)
	// 			return

	// 		setIsLoading(true)
	// 		AnnualService.update(
	// 			user.uid,
	// 			currentAnnualReport._id.toString(),
	// 			{
	// 				accounts: annualState.accounts,
	// 				operations: annualState.operations,
	// 			}
	// 		)
	// 	} catch (error) {
	// 		if (error instanceof FirebaseError) handleDBErrors(error)
	// 	} finally {
	// 		setIsLoading(false)
	// 	}
	// }

	return {
		isLoading,
		initialStep,
		handleSaveAnnualReportStructure,
		closeReport,
		currentAnnualReport,
		annualState,
		annualActions,
		clearError,
		clearAccountsAndOperations,
		clearAccountTypes,
		setInitialCategories
	}
}
