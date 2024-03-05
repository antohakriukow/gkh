import ReportDeleteModal from './report-delete-modal/ReportDeleteModal'
import AccrualsSetterMap from './steps/accruals-setter/AccrualsSetterMap'
import CategoriesMap from './steps/categories-setter/CategoriesMap'
import { useCategories } from './steps/categories-setter/useCategories'
import CreditSorterMap from './steps/credit-sorter/CreditSorterMap'
import { useCreditSorter } from './steps/credit-sorter/useCreditSorter'
import DebitSorterMap from './steps/debit-sorter/DebitSorterMap'
import { useDebitSorter } from './steps/debit-sorter/useDebitSorter'
import InitialStepMap from './steps/initial-step/InitialStepMap'
import { useInitialStepMap } from './steps/initial-step/useInitialStepMap'
import { usePreview } from './steps/preview/components/usePreview'
import stepsMap from './steps/stepsMap'
import { useAnnualReport } from './useAnnualReport'
import { FC, useEffect, useState } from 'react'

import { Button, Quiz, SubHeading } from '~/components/ui'

import { useModal } from '~/hooks/useModal'

import { IAnnualReport } from '~/shared/types/annual.interface'

import styles from './AnnualReport.module.scss'

const AnnualReport: FC = () => {
	const [initialStepIndex, setInitialStepIndex] = useState(0)
	const {
		isLoading,
		deleteAnnualReport,
		closeAnnualReport,
		annualReportInDB,
		paymentButtonData,
		isReportPayed
	} = useAnnualReport()
	const { showModal } = useModal()

	const handleShowReportDeleteModal = () => {
		showModal(<ReportDeleteModal deleteAnnualReport={deleteAnnualReport} />)
	}

	const {
		handleSaveAnnualReportStructure,
		clearAccountsAndOperations,
		annualState,
		clearError,
		clearAccountTypes,
		setInitialCategories,
		saveReportData,
		setAnnualReportInitialDataSavedToDb,
		initialStepDone
	} = useInitialStepMap()

	const initialStep = InitialStepMap(
		annualState,
		handleSaveAnnualReportStructure,
		clearAccountsAndOperations,
		clearAccountTypes,
		setInitialCategories,
		saveReportData,
		clearError,
		setAnnualReportInitialDataSavedToDb
	)

	const { saveMainCategories, isCategoriesPending } = useCategories()

	const categoriesStep = CategoriesMap(
		annualReportInDB ?? ({} as IAnnualReport),
		saveMainCategories,
		isCategoriesPending
	)
	const accrualsStep = AccrualsSetterMap(
		annualReportInDB ?? ({} as IAnnualReport)
	)

	const {
		setBankOperationsTag,
		saveBankOperationsToDB: saveCreditBankOperationsToDB
	} = useCreditSorter()

	const stepCreditSorter = CreditSorterMap(
		annualReportInDB ?? ({} as IAnnualReport),
		saveCreditBankOperationsToDB
	)

	const {
		saveBankOperationsToDB: saveDebitBankOperationsToDB,
		clearCategoryIdIFNotExists
	} = useDebitSorter()

	const stepDebitSorter = DebitSorterMap(
		annualReportInDB ?? ({} as IAnnualReport),
		saveDebitBankOperationsToDB,
		clearCategoryIdIFNotExists
	)

	const { downloadXLSX } = usePreview()

	const steps = stepsMap(
		annualReportInDB,
		initialStep,
		categoriesStep,
		accrualsStep,
		stepCreditSorter,
		stepDebitSorter,
		initialStepDone,
		downloadXLSX,
		isReportPayed,
		paymentButtonData
	)

	const hasCategories =
		(annualReportInDB?.data?.categories?.main?.length ?? 0) > 0

	const hasAccruals =
		(annualReportInDB?.data?.categories?.main?.reduce(
			(sum, category) => (category.amount ? sum + category.amount : sum),
			0
		) ?? 0) > 0

	const hasBankOperationWithCategoryId = annualReportInDB?.data?.bankOperations
		?.filter(operation => operation.amount < 0)
		?.find(operation => !!operation.categoryId)

	const hasNoBankOperationWithCategoryId =
		annualReportInDB?.data?.bankOperations
			?.filter(
				operation => operation.amount < 0 && operation.tag !== 'internal'
			)
			?.find(operation => !!operation.categoryId)

	useEffect(() => {
		if (initialStepDone) setInitialStepIndex(1)
		if (hasCategories) {
			setInitialStepIndex(2)
			// if (hasAccruals) setInitialStepIndex(3)
			if (hasBankOperationWithCategoryId) setInitialStepIndex(4)
			if (hasNoBankOperationWithCategoryId) setInitialStepIndex(5)
		}
	}, [
		initialStepDone,
		hasCategories,
		hasAccruals,
		hasBankOperationWithCategoryId,
		hasNoBankOperationWithCategoryId
	])

	const title = `Отчет об исполнении сметы ${
		annualReportInDB?.company.name.short ?? ''
	}`

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<SubHeading title={title} />
				<div className={styles.toolbar}>
					{!isReportPayed && (
						<Button onClick={handleShowReportDeleteModal}>Удалить</Button>
					)}
					<Button onClick={closeAnnualReport}>Закрыть</Button>
				</div>
			</div>
			<Quiz
				isLoading={isLoading}
				steps={steps}
				initialStepIndex={initialStepIndex}
			/>
		</div>
	)
}
export default AnnualReport
