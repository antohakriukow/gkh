import { STEP_TITLE } from './data-uploader.data'
import { useDataUploaderContext } from './provider/provider'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { prepareAnnualState } from '~/core/annual/prepareAnnualData'
import { useAuth, useWindowWidth } from '~/hooks'

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
} from '~/utils/annual/utils'

import { useAnnualReport } from '../useAnnualReport'

export const useDataUploader = () => {
	const { user } = useAuth()
	const { reportId } = useParams<{ reportId: string }>()

	const {
		isReportPayed,
		closeAnnualReport,
		deleteAnnualReport,
		annualReportInDB,
		redirectToCategoriesSetter,
		redirectToPreview
	} = useAnnualReport()

	const {
		isLoading,
		annualOperations,
		annualAccounts,
		structure,
		step,
		setStep,
		annualFileNames,
		annualStartDate,
		annualFinalDate,
		setIsLoading
	} = useDataUploaderContext()

	const { width } = useWindowWidth()
	const isNarrow = width < 500

	const COMPUTED_STEP_TITLE_TWO =
		structure === 'accruals/services'
			? STEP_TITLE.TWO_ACCOUNTING
			: STEP_TITLE.TWO_BANK

	const stepOneDone = structure !== undefined
	const stepTwoDone =
		annualOperations.length !== 0 && annualAccounts.length !== 0
	const stepThreeDone = !annualAccounts.some(account => !account.type)

	const handleNext = () => {
		if (step === 1 && stepOneDone) setStep(2)
		if (step === 2 && stepTwoDone) setStep(3)
		if (step === 3 && stepThreeDone) setStep(4)
	}

	const isNextButtonDisabled =
		(step === 1 && !stepOneDone) ||
		(step === 2 && !stepTwoDone) ||
		(step === 3 && !stepThreeDone)

	const saveReportData = async (
		annualOperations: IAccountingOperation[] | IBankOperation[],
		annualAccounts: IAccount[],
		annualFileNames: string[],
		annualStartDate: string,
		annualFinalDate: string,
		structure: TypeAnnualReportStructure | undefined
	) => {
		if (!user?.uid || !reportId) return

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
		;(
			['renovation', 'target', 'commerce'] as TypeDefinedAnnualDirection[]
		).forEach(direction => {
			if (getExistingDirections(annualState.accounts).includes(direction)) {
				categoriesData[direction] = createMockCategoriesFromAccounts(
					annualState.accounts,
					direction
				)
			}
		})

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
		}
	}

	const handleSubmit = async () => {
		setIsLoading(true)

		await saveReportData(
			annualOperations,
			annualAccounts,
			annualFileNames,
			annualStartDate,
			annualFinalDate,
			structure
		)
		setIsLoading(false)
		structure === 'cash/services'
			? redirectToCategoriesSetter()
			: redirectToPreview()
	}

	useEffect(() => {
		if (annualReportInDB?.data?.settings?.structure)
			structure === 'cash/services'
				? redirectToCategoriesSetter()
				: redirectToPreview()
	}, [
		annualReportInDB,
		structure,
		redirectToCategoriesSetter,
		redirectToPreview
	])

	return {
		isLoading,
		isNarrow,
		isNextButtonDisabled,
		isReportPayed,
		step,
		COMPUTED_STEP_TITLE_TWO,
		stepOneDone,
		stepTwoDone,
		stepThreeDone,
		setStep,
		handleNext,
		closeAnnualReport,
		deleteAnnualReport,
		handleSubmit
	}
}
