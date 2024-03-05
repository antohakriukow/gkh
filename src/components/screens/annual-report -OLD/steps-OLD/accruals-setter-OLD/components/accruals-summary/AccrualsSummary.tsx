import { FC } from 'react'
import { getAnnualDirectionTitle } from '~/core/annual/shared'

import { useAnnualReport } from '~/components/screens/annual-report -OLD/useAnnualReport-OLD'

import { getExistingDirections } from '~/utils/annual.utils'
import { formatNumber } from '~/utils/number.utils'

import styles from './AccrualsSummary.module.scss'

const AccrualsSummary: FC = () => {
	const { annualReportInDB } = useAnnualReport()

	if (!annualReportInDB) return null

	const actualDirections = getExistingDirections(
		annualReportInDB.data?.accounts ?? []
	)
	const categories = annualReportInDB?.data?.categories

	return (
		<div className={styles.container}>
			<h4>Проверьте суммы начислений!</h4>
			{categories &&
				actualDirections.map(direction =>
					direction && categories[direction] ? (
						<p key={direction}>
							{getAnnualDirectionTitle(direction)}:{' '}
							{formatNumber(
								(categories[direction] ?? []).reduce(
									(sum, cat) => (cat.amount ? sum + cat.amount : sum),
									0
								) ?? 0
							)}
						</p>
					) : null
				)}
		</div>
	)
}
export default AccrualsSummary
