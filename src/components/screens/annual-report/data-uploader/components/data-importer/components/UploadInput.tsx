import { ChangeEvent, FC } from 'react'

import styles from '../data-importer.module.scss'

interface IUploadInputProps {
	onFileChange: (event: ChangeEvent<HTMLInputElement>) => void
	handleClickOnInput: () => void
	hasError: boolean
	annualError: string
}

const UploadInput: FC<IUploadInputProps> = ({
	onFileChange,
	handleClickOnInput,
	hasError,
	annualError
}) => {
	const PRESS_TO_CHOOSE_FILES = 'Нажмите, чтобы выбрать файлы'

	return (
		<>
			<input
				id='hidden-file-input'
				type='file'
				multiple
				onChange={onFileChange}
				style={{ display: 'none' }}
			/>
			<div onClick={handleClickOnInput} className={styles.input}>
				{PRESS_TO_CHOOSE_FILES}
			</div>
			{hasError && (
				<div className={styles.error}>
					<p>{annualError}</p>
				</div>
			)}
		</>
	)
}
export default UploadInput
