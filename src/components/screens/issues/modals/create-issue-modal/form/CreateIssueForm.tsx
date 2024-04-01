import { issueSubjectOptions } from './create-issue.data'
import { FC, useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useIssue } from '~/hooks'

import { Button, Select } from '~/components/ui'
import TextArea from '~/components/ui/form-elements/TextArea/TextArea'

import { IIssue, TypeIssueSubject } from '~/shared/types/issue.interface'

import styles from '../CreateIssueModal.module.scss'

const CreateIssueForm: FC = () => {
	const { createIssue } = useIssue()
	const { register, control, formState, handleSubmit } = useForm<IIssue>({
		mode: 'onSubmit'
	})
	const [width, setWidth] = useState(window.innerWidth)

	const onCreateIssue: SubmitHandler<{
		subject: TypeIssueSubject
		description: string
	}> = ({ subject, description }) => createIssue({ subject, description })

	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth)
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	const getWidth = (width: number) => {
		if (width >= 720) {
			return 320
		} else if (width >= 650) {
			return 280
		} else if (width >= 570) {
			return 200
		} else if (width >= 475) {
			return 200
		} else if (width >= 425) {
			return 175
		} else if (width >= 360) {
			return 150
		} else {
			return 140
		}
	}

	const selectWidth = getWidth(width)

	return (
		<div className={styles.form}>
			<Controller
				name='subject'
				control={control}
				rules={{
					required: 'Обязательное поле'
				}}
				render={({ field, fieldState: { error } }) => (
					<Select
						error={formState.errors.subject}
						field={field}
						placeholder='Проблема'
						isRequired
						options={issueSubjectOptions}
						width={selectWidth}
					/>
				)}
			/>
			<TextArea
				{...register('description', { required: 'Обязательное поле' })}
				error={formState.errors.description}
				placeholder='Описание'
				autoComplete='off'
			/>
			<Button className={styles.button} onClick={handleSubmit(onCreateIssue)}>
				Сообщить о проблеме
			</Button>
		</div>
	)
}
export default CreateIssueForm
