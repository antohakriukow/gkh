import Details from './components/Details'
import Flow from './components/Flow'
import MessageCreator from './components/MessageCreator'
import { FC } from 'react'

import { Heading } from '~/components/ui'

import { IIssueItem } from '../../IssueItem/issue-item.interface'

import styles from './IssueModal.module.scss'

const IssueModal: FC<IIssueItem> = ({ issue }) => {
	return (
		<div className={styles.container}>
			<Heading title={`Обращение ${issue.shortId}`} />
			<Details issue={issue} />
			<MessageCreator issue={issue} />
			<Flow issue={issue} />
		</div>
	)
}
export default IssueModal
