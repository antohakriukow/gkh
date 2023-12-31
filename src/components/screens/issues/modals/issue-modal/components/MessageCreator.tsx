import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { BsSendFill } from 'react-icons/bs'

import { Button } from '~/components/ui'
import TextArea from '~/components/ui/form-elements/TextArea/TextArea'

import { useIssue } from '~/hooks/useIssue'

import { IIssueMessageCreate } from '~/shared/types/issue.interface'

import { IIssueItem } from '../../../IssueItem/issue-item.interface'
import styles from '../IssueModal.module.scss'

const MessageCreator: FC<IIssueItem & { onIssueUpdate: () => void }> = ({
	issue,
	onIssueUpdate
}) => {
	const { sendMessage } = useIssue()
	const { register, handleSubmit, setValue } = useForm<IIssueMessageCreate>({
		mode: 'onSubmit'
	})

	const onSendMessage: SubmitHandler<{ message: string }> = async ({
		message
	}) => {
		await sendMessage(issue._id, message)
		setValue('message', '')
		onIssueUpdate()
	}

	return (
		<div className={styles.block}>
			<div className={styles.creator}>
				<TextArea {...register('message')} autoComplete='off' />
				<div className={styles.send} onClick={handleSubmit(onSendMessage)}>
					<BsSendFill size={30} color='#fff' />
				</div>
			</div>
		</div>
	)
}

export default MessageCreator
