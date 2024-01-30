import { useDataImporter } from './useDataImporter'
import { FC, useCallback } from 'react'

import { SubHeading } from '~/components/ui'

import styles from './DataImporter.module.scss'

const DataImporter: FC = () => {
	const { handleFiles, handleClick, state } = useDataImporter()

	const onFileChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			if (event.target.files) {
				const newFiles = Array.from(event.target.files)
				handleFiles(newFiles)
			}
		},
		[handleFiles]
	)

	const handleClickOnInput = () => {
		const hiddenInput = document.getElementById('hidden-file-input')
		if (hiddenInput) {
			hiddenInput.click()
		}
	}

	const operations = state.operations
	const hasOperations = operations.length > 0
	const hasError = !!state.error

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
						<p>{`Найдено операций: ${operations.length} по ${
							state.accounts.length
						} счетам за период с ${operations[0].date} по ${
							operations[operations.length - 1].date
						}.`}</p>
					</div>
				)}
			</>
		</div>
	)
}
export default DataImporter
