import cn from 'clsx'
import { FC } from 'react'

import { useAuth } from '~/hooks/useAuth'
import { useData } from '~/hooks/useData'

import { convertTimestampToDateWithTime } from '~/utils/time.utils'

import { IIssueItem } from '../../../IssueItem/issue-item.interface'
import styles from '../IssueModal.module.scss'

const Flow: FC<IIssueItem> = ({ issue }) => {
	const { user } = useAuth()
	const { messages } = useData()

	const data = messages
		.filter(message => message.parentId === issue._id)
		.sort((a, b) => parseInt(b.updatedAt || '0') - parseInt(a.updatedAt || '0'))

	return (
		<div className={styles.block}>
			<div className={styles.header}>Сообщения</div>
			<div className={styles.messages}>
				{data.map(message => (
					<div
						key={message.createdAt}
						className={cn(styles.message, {
							[styles.inbox]: user?.uid !== message.author._id,
							[styles.outbox]: user?.uid === message.author._id
						})}
					>
						<p className={styles.author}>
							{user?.uid === message.author._id
								? message.author.displayName
								: 'Техподдержка'}
						</p>
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
