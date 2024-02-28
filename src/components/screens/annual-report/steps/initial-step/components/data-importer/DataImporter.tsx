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
						<p>
							Загружено файлов: {state.fileNames.length} (
							{state.fileNames.toString()})
						</p>
						<p>Найдено счетов: {state.accounts.length}</p>
						<p>Найдено операций: {state.operations.length}</p>
						<p>Начало периода: {state.operations[0].date}</p>
						<p>
							Конец периода:{' '}
							{state.operations[state.operations.length - 1].date}
						</p>
					</div>
				)}
			</>
		</div>
	)
}
export default DataImporter
