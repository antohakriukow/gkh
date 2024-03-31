import { ReportManifest } from './reportManifest.data'
import { FC } from 'react'
import { useModal } from '~/hooks'

import { Button } from '~/components/ui'

import styles from './ConfirmGenerationModal.module.scss'

const ConfirmGenerationModal: FC<{ generateReport: () => void }> = ({
	generateReport
}) => {
	const { hideModal } = useModal()

	const accept = () => {
		generateReport()
		hideModal()
	}

	return (
		<div className={styles.container}>
			<h3 className={styles.title}>
				Отчет будет сформирован исходя из следующих допущений:
			</h3>
			<ul className={styles.list}>
				{ReportManifest.map((item, index) => (
					<li key={index} className={styles.item}>
						{item}
					</li>
				))}
			</ul>
			<div className={styles.buttons}>
				<Button onClick={accept}>Продолжить</Button>
				{/* <Button color='danger' onClick={hideModal}>
					Отменить
				</Button> */}
			</div>
		</div>
	)
}
export default ConfirmGenerationModal
