import { FC, Fragment, useState } from 'react'
import { toast } from 'react-toastify'
import { useModal } from '~/hooks'

import { Button, Loader } from '~/components/ui'

import styles from './ReportDeleteModal.module.scss'

const ReportDeleteModal: FC<{ handleDelete: () => void; title?: string }> = ({
	handleDelete,
	title = 'отчет'
}) => {
	const [isLoading, setIsLoading] = useState(false)

	const { hideModal } = useModal()

	const accept = async () => {
		try {
			setIsLoading(true)
			await handleDelete()
			hideModal()
		} catch (error) {
			toast('Ошибка', { type: 'error' })
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className={styles.container}>
			{isLoading ? (
				<Loader loaderType='small' />
			) : (
				<Fragment>
					<h3 className={styles.title}>
						Вы уверены, что хотите удалить {title.toLowerCase()}?
					</h3>
					<p className={styles.text}>
						Восстановить {title.toLowerCase()} после удаление невозможно.
					</p>
					<div className={styles.buttons}>
						<Button onClick={hideModal}>Вернуться назад</Button>
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
