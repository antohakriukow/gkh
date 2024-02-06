import { FirebaseError } from 'firebase/app'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAnnualCategoriesGraph } from '~/core/annual/getAnnualCategoriesGraph'
import { prepareAnnualState } from '~/core/annual/prepareAnnualData'

import { useActions } from '~/hooks/useActions'
import { useAuth } from '~/hooks/useAuth'
import { useTypedSelector } from '~/hooks/useTypedSelector'

import { AnnualService } from '~/services/annual.service'

import { handleDBErrors } from '~/utils/error.utils'

export const useStepOne = () => {
	const { user } = useAuth()
	const navigate = useNavigate()
	const { currentAnnualReport } = useTypedSelector(state => state.ui)
	const annualState = useTypedSelector(state => state.annual)
	const {
		setAnnualReportInitialDataSavedToDb,
		setAnnualCategories,
		setAnnualAccounts,
		setAnnualOperations,
		setAnnualFileNames,
		setAnnualError
	} = useActions()
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
		setAnnualAccounts([])
		setAnnualOperations([])
		setAnnualFileNames([])
	}

	const setInitialCategories = () => {
		if (annualState.structure === 'accruals/services') {
			const categories = getAnnualCategoriesGraph(annualState)
			setAnnualCategories(categories)
		}
	}

	const clearError = () => setAnnualError('')
	const clearAccountTypes = () =>
		setAnnualAccounts(
			annualState.accounts.map(account => ({ ...account, type: undefined }))
		)

	const saveReportData = () => {
		if (!user?.uid || !currentAnnualReport) return

		setIsLoading(true)
		const modifiedState = prepareAnnualState(annualState)

		try {
			console.log('modifiedState: ', modifiedState)
			const data = {
				settings: { structure: modifiedState.structure },
				directions: modifiedState.directions ?? [],
				accounts: modifiedState.accounts,
				categories: modifiedState.categories,
				operations: modifiedState.operations
			}
			AnnualService.update(user?.uid, currentAnnualReport._id.toString(), data)
			setAnnualReportInitialDataSavedToDb(true)
		} catch (error) {
			console.log('error: ', error)
			setAnnualReportInitialDataSavedToDb(false)
		} finally {
			setIsLoading(false)
		}
	}

	return {
		isLoading,
		initialStep,
		handleSaveAnnualReportStructure,
		closeReport,
		currentAnnualReport,
		annualState,
		clearError,
		clearAccountsAndOperations,
		clearAccountTypes,
		setInitialCategories,
		saveReportData,
		setAnnualReportInitialDataSavedToDb
	}
}
