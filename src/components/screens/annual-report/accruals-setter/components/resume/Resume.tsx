import { FC, Fragment } from 'react'
import { CgDanger } from 'react-icons/cg'
import { getAnnualDirectionTitle } from '~/core/annual/shared'

import { useAnnualReport } from '~/components/screens/annual-report -OLD/useAnnualReport-OLD'

import { getExistingDirections } from '~/utils/annual.utils'
import { formatNumber } from '~/utils/number.utils'

import styles from './resume.module.scss'

const Item: FC<{ parameter: string; value: string }> = ({
	parameter,
	value
}) => (
	<div className={styles.item}>
		<p>{parameter}: </p>
		<p>{value}</p>
	</div>
)

const Resume: FC = () => {
	const { annualReportInDB } = useAnnualReport()

	if (!annualReportInDB) return null

	const actualDirections = getExistingDirections(
		annualReportInDB.data?.accounts ?? []
	)
	const categories = annualReportInDB?.data?.categories

	return (
		<div>
			<div className={styles.danger}>
				<CgDanger size={44} color='#db3140' />
				<p>
					<span>Внимание! </span>Проверьте суммы начислений.
				</p>
			</div>
			<div className={styles.list}>
				{categories &&
					actualDirections.map(direction =>
						direction && categories[direction] ? (
							<Item
								key={direction}
								parameter={getAnnualDirectionTitle(direction)}
								value={formatNumber(
									(categories[direction] ?? []).reduce(
										(sum, cat) => (cat.amount ? sum + cat.amount : sum),
										0
									) ?? 0
								)}
							/>
						) : null
					)}
			</div>
		</div>
	)
}
export default Resume
