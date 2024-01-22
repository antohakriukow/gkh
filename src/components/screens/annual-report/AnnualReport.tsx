import stepsMap from './steps/stepsMap'
import { useAnnualReport } from './useAnnualReport'
import { FC } from 'react'

import { Quiz } from '~/components/ui'

import styles from './AnnualReport.module.scss'

const AnnualReport: FC = () => {
	const { finalFunction, finalButtonTitle } = useAnnualReport()

	return (
		<div className={styles.container}>
			<Quiz
				steps={stepsMap}
				finalFunction={finalFunction}
				finalButtonTitle={finalButtonTitle}
			/>
		</div>
	)
}
export default AnnualReport
