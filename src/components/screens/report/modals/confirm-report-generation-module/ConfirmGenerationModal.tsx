import { ReportManifest } from './reportManifest.data'
import { FC } from 'react'
import { useModal } from '~/hooks'

import { Button } from '~/components/ui'

import styles from './ConfirmGenerationModal.module.scss'

const ConfirmGenerationModal: FC<{ generateReport: () => void }> = ({
	generateReport
}) => {
	const { hideModal } = useModal()
	const CONTINUE = 'Продолжить'
	const REPORT_WILL_BE_GENERATED_WITH_THIS_RULES =
		'Отчет будет сформирован исходя из следующих допущений:'

	const accept = () => {
		generateReport()
		hideModal()
	}

	return (
		<div className={styles.container}>
			<h3 className={styles.title}>
				{REPORT_WILL_BE_GENERATED_WITH_THIS_RULES}
			</h3>
			<ul className={styles.list}>
				{ReportManifest.map((item, index) => (
					<li key={index} className={styles.item}>
						{item}
					</li>
				))}
			</ul>
			<div className={styles.buttons}>
				<Button onClick={accept}>{CONTINUE}</Button>
			</div>
		</div>
	)
}
export default ConfirmGenerationModal
