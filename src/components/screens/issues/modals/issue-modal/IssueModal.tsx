import Details from './components/Details'
import Flow from './components/Flow'
import MessageCreator from './components/MessageCreator'
import { FC, useState } from 'react'

import { Heading } from '~/components/ui'

import { IssuesService } from '~/services/issue.service'

import { IIssueItem } from '../../IssueItem/issue-item.interface'

import styles from './IssueModal.module.scss'

const IssueModal: FC<IIssueItem> = ({ issue }) => {
	const [currentIssue, setCurrentIssue] = useState(issue)

	const handleIssueUpdate = async () => {
		// Загрузка обновленных данных обращения
		const updatedIssue = await IssuesService.getById(issue.owner._id, issue._id)
		setCurrentIssue(updatedIssue)
	}

	return (
		<div className={styles.container}>
			<Heading title={`Обращение ${issue.shortId}`} />
			<Details issue={currentIssue} />
			<MessageCreator issue={currentIssue} onIssueUpdate={handleIssueUpdate} />
			<Flow issue={currentIssue} />
		</div>
	)
}
export default IssueModal
