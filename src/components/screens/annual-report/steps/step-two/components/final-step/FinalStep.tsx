import { FC } from 'react'
import { getAnnualDirectionTitle } from '~/core/annual/shared'

import { useAnnualReport } from '~/components/screens/annual-report/useAnnualReport'

import { getExistingDirections } from '~/utils/annual.utils'

import styles from './FinalStep.module.scss'

const FinalStep: FC = () => {
	const { annualReportInDB } = useAnnualReport()

	if (!annualReportInDB) return null

	const actualDirections = getExistingDirections(
		annualReportInDB.data?.accounts ?? []
	)
	const categories = annualReportInDB.data.categories

	return (
		<div className={styles.container}>
			<h4>Проверьте суммы начислений!</h4>
			{categories &&
				actualDirections.map(direction =>
					direction && categories[direction] ? (
						<p key={direction}>
							{getAnnualDirectionTitle(direction)}:{' '}
							{(categories[direction] ?? [])
								.reduce((sum, cat) => (cat.amount ? sum + cat.amount : sum), 0)
								.toFixed(2)}
						</p>
					) : null
				)}
		</div>
	)
}
export default FinalStep
