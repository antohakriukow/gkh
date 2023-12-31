import { FC } from 'react'

import { getIssueColor } from '~/utils/issue.utils'

import styles from '../IssueItem.module.scss'
import { IIssueItem } from '../issue-item.interface'

const IssueHeader: FC<IIssueItem> = ({ issue }) => {
	return (
		<div
			className={styles.header}
			style={{ backgroundColor: getIssueColor(issue.status) }}
		>
			<div className={styles.heading}>
				<p className={styles.title}>Обращение</p>
				<p className={styles.data}>{issue.shortId}</p>
			</div>
		</div>
	)
}
export default IssueHeader
