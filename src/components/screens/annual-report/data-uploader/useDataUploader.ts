import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { prepareAnnualState } from '~/core/annual/prepareAnnualData'

import { useAuth } from '~/hooks/useAuth'

import {
	IAccount,
	IAccountingOperation,
	IBankOperation,
	TypeAnnualReportStructure,
	TypeCategoriesMap,
	TypeDefinedAnnualDirection
} from '~/shared/types/annual.interface'

import { AnnualService } from '~/services/annual.service'

import {
	createMockCategoriesFromAccounts,
	getExistingDirections
} from '~/utils/annual.utils'

export const useDataUploader = () => {
	const [isLoading, setIsLoading] = useState(false)
	const { user } = useAuth()
	const { reportId } = useParams<{ reportId: string }>()
	const navigate = useNavigate()

	const redirectToCategoriesSetter = () =>
		navigate(`/annual-reports/edit/${reportId}/categories-setter`)
	const redirectToPreview = () =>
		navigate(`/annual-reports/edit/${reportId}/preview`)

	const saveReportData = async (
		annualOperations: IAccountingOperation[] | IBankOperation[],
		annualAccounts: IAccount[],
		annualFileNames: string[],
		annualStartDate: string,
		annualFinalDate: string,
		structure: TypeAnnualReportStructure | undefined
	) => {
		if (!user?.uid || !reportId) return
		setIsLoading(true)

		const annualState = {
			operations: annualOperations,
			accounts: annualAccounts,
			fileNames: annualFileNames,
			startDate: annualStartDate,
			finalDate: annualFinalDate,
			categories: [],
			structure
		}

		const modifiedState = prepareAnnualState(annualState)

		const categoriesData = {} as TypeCategoriesMap
		;(['renovation', 'target', 'commerce'] as TypeDefinedAnnualDirection[]).map(
			direction => {
				if (getExistingDirections(annualState.accounts).includes(direction)) {
					categoriesData.renovation = createMockCategoriesFromAccounts(
						annualState.accounts,
						direction
					)
				}
			}
		)

		try {
			const data = {
				settings: { structure: modifiedState.structure },
				directions: modifiedState.directions ?? [],
				accounts: modifiedState.accounts,
				categories: categoriesData,
				bankOperations: [],
				accountingOperations: []
			}

			modifiedState.structure === 'accruals/services'
				? (data.accountingOperations = modifiedState.operations)
				: (data.bankOperations = modifiedState.operations)

			await AnnualService.update(user?.uid, String(reportId), data)
		} catch (error) {
			console.log('error: ', error)
		} finally {
			setIsLoading(false)
		}
	}

	return {
		isLoading,
		saveReportData,
		redirectToCategoriesSetter,
		redirectToPreview
	}
}
