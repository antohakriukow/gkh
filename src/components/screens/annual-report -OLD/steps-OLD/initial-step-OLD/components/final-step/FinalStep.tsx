import { FC } from 'react'

import styles from './FinalStep.module.scss'

const FinalStep: FC = () => {
	return (
		<div className={styles.container}>
			<h4>Внимание!</h4>
			<p>
				Перед переходом к следующему шагу удостоверьтесь в правильности
				введенных данных. Вернуться к их редактированию позже будет невозможно.
			</p>
		</div>
	)
}
export default FinalStep
