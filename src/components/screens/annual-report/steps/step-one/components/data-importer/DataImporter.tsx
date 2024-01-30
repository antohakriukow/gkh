import { useDataImporter } from './useDataImporter'
import { FC } from 'react'

import { SubHeading } from '~/components/ui'

import styles from './DataImporter.module.scss'

const DataImporter: FC = () => {
	const { state, onFileChange, handleClickOnInput, hasOperations, hasError } =
		useDataImporter()

	return (
		<div className={styles.container}>
			<SubHeading title='Загрузите данные для отчета' />
			<>
				<input
					id='hidden-file-input'
					type='file'
					multiple
					onChange={onFileChange}
					style={{ display: 'none' }}
				/>
				<div onClick={handleClickOnInput} className={styles.input}>
					Нажмите, чтобы выбрать файлы
				</div>
				{hasError && (
					<div className={styles.error}>
						<p>{state.error}</p>
					</div>
				)}
				{hasOperations && (
					<div className={styles.resume}>
						<p>{`Найдено операций: ${state.operations.length} по ${
							state.accounts.length
						} счетам за период с ${state.operations[0].date} по ${
							state.operations[state.operations.length - 1].date
						}.`}</p>
					</div>
				)}
			</>
		</div>
	)
}
export default DataImporter
