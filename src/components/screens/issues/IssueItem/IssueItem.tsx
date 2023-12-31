import IssueBody from './components/IssueBody'
import IssueButtons from './components/IssueButtons'
import IssueHeader from './components/IssueHeader'
import { IIssueItem } from './issue-item.interface'
import { FC } from 'react'

import styles from './IssueItem.module.scss'

const IssueItem: FC<IIssueItem> = ({ issue }) => {
	return (
		<div className={styles.container}>
			<IssueHeader issue={issue} />
			<IssueBody issue={issue} />
			<IssueButtons issue={issue} />
		</div>
	)
}
export default IssueItem
