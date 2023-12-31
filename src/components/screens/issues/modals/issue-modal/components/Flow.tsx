import cn from 'clsx'
import { FC } from 'react'

import { useAuth } from '~/hooks/useAuth'

import { convertTimestampToDateWithTime } from '~/utils/time.utils'

import { IIssueItem } from '../../../IssueItem/issue-item.interface'
import styles from '../IssueModal.module.scss'

const Flow: FC<IIssueItem> = ({ issue }) => {
	const { user } = useAuth()
	const isOutbox = user?.uid === issue.owner._id

	const sortedMessages = Object.values(issue.messages).sort(
		(a, b) => parseInt(b.updatedAt || '0') - parseInt(a.updatedAt || '0')
	)

	return (
		<div className={styles.block}>
			<div className={styles.header}>Сообщения</div>
			<div className={styles.messages}>
				{sortedMessages.map(message => (
					<div
						className={cn(styles.message, {
							[styles.inbox]: !isOutbox,
							[styles.outbox]: isOutbox
						})}
					>
						<p className={styles.text}>{message.message}</p>
						<p className={styles.date}>
							{convertTimestampToDateWithTime(+message.createdAt)}
						</p>
					</div>
				))}
			</div>
		</div>
	)
}
export default Flow
