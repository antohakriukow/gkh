import { useDataImporter } from './useDataImporter'
import { Dispatch, FC, Fragment, SetStateAction } from 'react'

import {
	IAccount,
	IAccountingOperation,
	IBankOperation,
	TypeAnnualReportStructure
} from '~/shared/types/annual.interface'

import styles from './DataImporter.module.scss'

interface IDataImporterProps {
	annualOperations: IAccountingOperation[] | IBankOperation[]
	annualAccounts: IAccount[]
	annualFileNames: string[]
	annualStartDate: string
	annualFinalDate: string
	annualError: string
	structure: TypeAnnualReportStructure | undefined

	setAnnualOperations: Dispatch<
		SetStateAction<IAccountingOperation[] | IBankOperation[]>
	>
	setAnnualAccounts: Dispatch<SetStateAction<IAccount[]>>
	setAnnualFileNames: Dispatch<SetStateAction<string[]>>
	setAnnualStartDate: Dispatch<SetStateAction<string>>
	setAnnualFinalDate: Dispatch<SetStateAction<string>>
	setAnnualError: Dispatch<SetStateAction<string>>
}

const DataImporter: FC<IDataImporterProps> = ({
	annualOperations,
	annualAccounts,
	annualFileNames,
	annualStartDate,
	annualFinalDate,
	annualError,
	structure,

	setAnnualOperations,
	setAnnualAccounts,
	setAnnualFileNames,
	setAnnualStartDate,
	setAnnualFinalDate,
	setAnnualError
}) => {
	const { onFileChange, handleClickOnInput } = useDataImporter(
		structure,
		setAnnualOperations,
		setAnnualAccounts,
		setAnnualFileNames,
		setAnnualStartDate,
		setAnnualFinalDate,
		setAnnualError
	)

	const hasOperations = annualOperations.length > 0
	const hasError = !!annualError

	return (
		<Fragment>
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
					<p>{annualError}</p>
				</div>
			)}
			{hasOperations && (
				<div className={styles.resume}>
					<p>
						Загружено файлов: {annualFileNames.length} (
						{annualFileNames.toString()})
					</p>
					<p>Найдено счетов: {annualAccounts.length}</p>
					<p>Найдено операций: {annualOperations.length}</p>
					<p>Начало периода: {annualOperations[0].date}</p>
					<p>
						Конец периода: {annualOperations[annualOperations.length - 1].date}
					</p>
				</div>
			)}
		</Fragment>
	)
}
export default DataImporter
