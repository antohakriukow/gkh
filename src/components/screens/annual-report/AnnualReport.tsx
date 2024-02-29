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
	const { deleteAnnualReport, closeAnnualReport, annualReportInDB } =
		useAnnualReport()
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

	const { setBankOperationsTag } = useCreditSorter()

	const stepCreditSorter = CreditSorterMap(
		annualReportInDB ?? ({} as IAnnualReport),
		setBankOperationsTag
	)

	const { setBankOperationsCategory } = useDebitSorter()

	const stepDebitSorter = DebitSorterMap(
		annualReportInDB ?? ({} as IAnnualReport),
		setBankOperationsCategory
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
		downloadXLSX
	)

	useEffect(() => {
		if (initialStepDone) setInitialStepIndex(1)
	}, [initialStepDone])

	const title = `Отчет об исполнении сметы ${annualReportInDB?.company.name.short}`

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<SubHeading title={title} />
				<div className={styles.toolbar}>
					<Button onClick={handleShowReportDeleteModal}>Удалить</Button>
					<Button onClick={closeAnnualReport}>Закрыть</Button>
				</div>
			</div>
			<Quiz steps={steps} initialStepIndex={initialStepIndex} />
		</div>
	)
}
export default AnnualReport
