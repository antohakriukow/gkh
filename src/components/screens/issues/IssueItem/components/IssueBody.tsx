import { FC } from 'react'

import { getIssueStatus, getIssueSubject } from '~/utils/issue/utils'
import { convertTimestampToDate } from '~/utils/time/utils'

import styles from '../IssueItem.module.scss'
import { IIssueItem } from '../issue-item.interface'

const IssueBody: FC<IIssueItem> = ({ issue }) => {
	return (
		<div className={styles.body}>
			<div className={styles.row}>
				<p className={styles.title}>Тема:</p>
				<p className={styles.data}>{getIssueSubject(issue.subject)}</p>
			</div>
			<div className={styles.row}>
				<p className={styles.title}>Статус:</p>
				<p className={styles.data}>{getIssueStatus(issue.status)}</p>
			</div>
			<div className={styles.row}>
				<p className={styles.title}>Дата:</p>
				<p className={styles.data}>
					{convertTimestampToDate(+issue.createdAt)}
				</p>
			</div>
		</div>
	)
}
export default IssueBody
