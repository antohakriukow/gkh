import UploadInput from './components/UploadInput'
import { useDataImporter } from './useDataImporter'
import { FC, Fragment } from 'react'

import { useDataUploaderContext } from '../../provider/provider'
import UploadInfoItem from '../shared/upload-info-item/UploadInfoItem'
import { useUploadInfo } from '../shared/useUploadInfo'

import styles from './data-importer.module.scss'

const DataImporter: FC = () => {
	const {
		annualOperations,
		annualError,
		structure,
		setAnnualOperations,
		setAnnualAccounts,
		setAnnualFileNames,
		setAnnualStartDate,
		setAnnualFinalDate,
		setAnnualCompanyNames,
		setAnnualError
	} = useDataUploaderContext()

	const { onFileChange, handleClickOnInput } = useDataImporter(
		structure,
		setAnnualOperations,
		setAnnualAccounts,
		setAnnualFileNames,
		setAnnualStartDate,
		setAnnualFinalDate,
		setAnnualCompanyNames,
		setAnnualError
	)

	const hasOperations = annualOperations.length > 0
	const hasError = !!annualError

	const uploadInfo = useUploadInfo()

	return (
		<Fragment>
			<UploadInput
				onFileChange={onFileChange}
				handleClickOnInput={handleClickOnInput}
				hasError={hasError}
				annualError={annualError}
			/>
			{hasOperations && (
				<div className={styles.resume}>
					{uploadInfo.map(item => (
						<UploadInfoItem
							key={item.title}
							title={item.title}
							value={item.value ?? ''}
						/>
					))}
				</div>
			)}
		</Fragment>
	)
}
export default DataImporter
