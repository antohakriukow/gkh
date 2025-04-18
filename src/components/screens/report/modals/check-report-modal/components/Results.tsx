import { FC } from 'react'

import {
	ICheckReportResult,
	TypeCheckResult
} from '~/shared/types/report.interface'

import styles from '../CheckReportModal.module.scss'

interface IResults {
	type: TypeCheckResult
	data: ICheckReportResult[]
}

const Results: FC<IResults> = ({ type, data }) => {
	if (!data || data.length === 0) return null
	const ERRORS = 'Ошибки'
	const WARNINGS = 'Предупреждения'

	return (
		<div className={type === 'error' ? styles.errors : styles.warnings}>
			<h3 className={styles.subTitle}>
				{type === 'error' ? ERRORS : WARNINGS}
			</h3>
			<ul className={styles.list}>
				{data.map((result: ICheckReportResult, index: number) => (
					<li className={styles.item} key={`${result.type}-${index}`}>
						{result.message}
					</li>
				))}
			</ul>
		</div>
	)
}

export default Results
