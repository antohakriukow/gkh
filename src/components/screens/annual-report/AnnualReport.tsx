import { useFinalStep } from './steps/step-final/components/useFinalStep'
import stepFourMap from './steps/step-four/stepFourMap'
import { useStepFour } from './steps/step-four/useStepFour'
import stepOneMap from './steps/step-one/stepOneMap'
import { useStepOne } from './steps/step-one/useStepOne'
import stepThreeMap from './steps/step-three/stepThreeMap'
import { useStepThree } from './steps/step-three/useStepThree'
import stepsMap from './steps/stepsMap'
import { useAnnualReport } from './useAnnualReport'
import { FC, useEffect, useState } from 'react'

import { Button, Quiz, SubHeading } from '~/components/ui'

import { IAnnualReport } from '~/shared/types/annual.interface'

import styles from './AnnualReport.module.scss'

const AnnualReport: FC = () => {
	const [initialStepIndex, setInitialStepIndex] = useState(0)
	const { deleteAnnualReport, closeAnnualReport, annualReportInDB } =
		useAnnualReport()

	const {
		handleSaveAnnualReportStructure,
		clearAccountsAndOperations,
		annualState,
		clearError,
		clearAccountTypes,
		setInitialCategories,
		saveReportData,
		setAnnualReportInitialDataSavedToDb,
		stepOneDone
	} = useStepOne()

	const stepOne = stepOneMap(
		annualState,
		handleSaveAnnualReportStructure,
		clearAccountsAndOperations,
		clearAccountTypes,
		setInitialCategories,
		saveReportData,
		clearError,
		setAnnualReportInitialDataSavedToDb
	)

	const { setBankOperationsTag } = useStepThree()

	const stepThree = stepThreeMap(
		annualReportInDB ?? ({} as IAnnualReport),
		setBankOperationsTag
	)

	const { setBankOperationsCategory } = useStepFour()

	const stepFour = stepFourMap(
		annualReportInDB ?? ({} as IAnnualReport),
		setBankOperationsCategory
	)

	const { downloadXLSX } = useFinalStep()

	const steps = stepsMap(
		annualReportInDB,
		stepOne,
		stepOneDone,
		stepThree,
		stepFour,
		downloadXLSX
	)

	useEffect(() => {
		if (stepOneDone) setInitialStepIndex(1)
	}, [stepOneDone])

	const title = `Отчет об исполнении сметы ${annualReportInDB?.company.name.short}`

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<SubHeading title={title} />
				<div className={styles.toolbar}>
					<Button onClick={deleteAnnualReport}>Удалить</Button>
					<Button onClick={closeAnnualReport}>Закрыть</Button>
				</div>
			</div>
			<Quiz steps={steps} initialStepIndex={initialStepIndex} />
		</div>
	)
}
export default AnnualReport
