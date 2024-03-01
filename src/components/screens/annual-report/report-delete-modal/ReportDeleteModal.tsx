import { FC } from 'react'

import { Button } from '~/components/ui'

import { useModal } from '~/hooks/useModal'

import styles from './ReportDeleteModal.module.scss'

const ReportDeleteModal: FC<{ deleteAnnualReport: () => void }> = ({
	deleteAnnualReport
}) => {
	const { hideModal } = useModal()

	const accept = () => {
		deleteAnnualReport()
		hideModal()
	}

	return (
		<div className={styles.container}>
			<h3 className={styles.title}>Вы действительно хотите удалить отчет?</h3>
			<p className={styles.text}>Восстановление будет невозможно.</p>
			<div className={styles.buttons}>
				<Button onClick={hideModal}>Вернуться к отчету</Button>
				<Button color='danger' onClick={accept}>
					Удалить безвозвратно
				</Button>
			</div>
		</div>
	)
}
export default ReportDeleteModal
