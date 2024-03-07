import { FC, Fragment, useState } from 'react'
import { toast } from 'react-toastify'

import { Button, Loader } from '~/components/ui'

import { useModal } from '~/hooks/useModal'

import styles from './ReportDeleteModal.module.scss'

const ReportDeleteModal: FC<{ deleteAnnualReport: () => void }> = ({
	deleteAnnualReport
}) => {
	const [isLoading, setIsLoading] = useState(false)

	const { hideModal } = useModal()

	const accept = async () => {
		try {
			setIsLoading(true)
			await deleteAnnualReport()
			hideModal()
		} catch (error) {
			toast('Ошибка при создании отчета', { type: 'error' })
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className={styles.container}>
			{isLoading ? (
				<Loader />
			) : (
				<Fragment>
					<h3 className={styles.title}>
						Вы действительно хотите удалить отчет?
					</h3>
					<p className={styles.text}>Восстановление будет невозможно.</p>
					<div className={styles.buttons}>
						<Button onClick={hideModal}>Вернуться к отчету</Button>
						<Button color='danger' onClick={accept}>
							Удалить безвозвратно
						</Button>
					</div>
				</Fragment>
			)}
		</div>
	)
}
export default ReportDeleteModal
