import CreateIssueForm from './form/CreateIssueForm'
import { FC } from 'react'

import { Heading } from '~/components/ui'

import styles from './CreateIssueModal.module.scss'

const CreateIssueModal: FC = () => {
	return (
		<div className={styles.container}>
			<Heading title='Обращение в техподдержку' />
			<CreateIssueForm />
		</div>
	)
}
export default CreateIssueModal
