import { useDataImporter } from './useDataImporter'
import { Dispatch, FC, Fragment, SetStateAction } from 'react'

import {
	IAccount,
	IAccountingOperation,
	IBankOperation,
	TypeAnnualReportStructure
} from '~/shared/types/annual.interface'

import { getAnnualReportStructureName } from '~/utils/annual.utils'

import ResumeItem from '../shared/resume-item/ResumeItem/ResumeItem'

import styles from './DataImporter.module.scss'

interface IDataImporterProps {
	annualOperations: IAccountingOperation[] | IBankOperation[]
	annualAccounts: IAccount[]
	annualFileNames: string[]
	annualStartDate: string
	annualFinalDate: string
	annualError: string
	annualCompanyNames: string[]
	structure: TypeAnnualReportStructure | undefined

	setAnnualOperations: Dispatch<
		SetStateAction<IAccountingOperation[] | IBankOperation[]>
	>
	setAnnualAccounts: Dispatch<SetStateAction<IAccount[]>>
	setAnnualFileNames: Dispatch<SetStateAction<string[]>>
	setAnnualStartDate: Dispatch<SetStateAction<string>>
	setAnnualFinalDate: Dispatch<SetStateAction<string>>
	setAnnualCompanyNames: Dispatch<SetStateAction<string[]>>
	setAnnualError: Dispatch<SetStateAction<string>>
}

const DataImporter: FC<IDataImporterProps> = ({
	annualOperations,
	annualAccounts,
	annualFileNames,
	annualStartDate,
	annualFinalDate,
	annualCompanyNames,
	annualError,
	structure,

	setAnnualOperations,
	setAnnualAccounts,
	setAnnualFileNames,
	setAnnualStartDate,
	setAnnualFinalDate,
	setAnnualCompanyNames,
	setAnnualError
}) => {
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

	const resumeData = [
		{ parameter: 'Загружено файлов', value: String(annualFileNames) },
		{
			parameter: 'Распознано компаний',
			value: String(
				`${annualCompanyNames.length} (${String(annualCompanyNames)})`
			)
		},
		{
			parameter: 'Распознано счетов',
			value: String(`${annualAccounts.length} (
						${String(annualAccounts.map(acc => ` ***${acc.number.slice(-4)}`))})`)
		},
		{
			parameter: 'Распознано операций',
			value: String(annualOperations.length)
		},
		{ parameter: 'Дата первой операции', value: String(annualStartDate) },
		{ parameter: 'Дата последней операции', value: String(annualFinalDate) }
	]

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
					{resumeData.map(item => (
						<ResumeItem
							key={item.parameter}
							parameter={item.parameter}
							value={item.value ?? ''}
						/>
					))}
				</div>
			)}
		</Fragment>
	)
}
export default DataImporter
