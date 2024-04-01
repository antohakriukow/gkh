import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { BsSendFill } from 'react-icons/bs'
import { useMessage } from '~/hooks'

import TextArea from '~/components/ui/form-elements/TextArea/TextArea'

import { IMessageCreate } from '~/shared/types/message.interface'

import { IIssueItem } from '../../../IssueItem/issue-item.interface'
import styles from '../IssueModal.module.scss'

const MessageCreator: FC<IIssueItem> = ({ issue }) => {
	const { sendMessage } = useMessage()
	const { register, handleSubmit, setValue } = useForm<IMessageCreate>({
		mode: 'onSubmit'
	})

	const onSendMessage: SubmitHandler<{ message: string }> = async ({
		message
	}) => {
		await sendMessage('issue', issue._id, message)
		setValue('message', '')
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
