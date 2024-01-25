import { useDataImporter } from './useDataImporter'
import { FC, useCallback } from 'react'
import {
	FieldError,
	UseFormRegister,
	UseFormSetValue,
	UseFormWatch
} from 'react-hook-form'

import { Button, SubHeading, UploadField } from '~/components/ui'

import { useActions } from '~/hooks/useActions'
import { useTypedSelector } from '~/hooks/useTypedSelector'

import { IAnnualReport } from '~/shared/types/annual.interface'

import { parseXLSXFile } from '~/utils/annual.utils'

import styles from './DataImporter.module.scss'

interface IDataImporterProps {
	register: UseFormRegister<IAnnualReport>
	error?: FieldError
	getValues: () => IAnnualReport
	setValue: UseFormSetValue<IAnnualReport>
	watch: UseFormWatch<IAnnualReport>
}

const DataImporter: FC<IDataImporterProps> = ({
	register,
	error,
	getValues,
	setValue,
	watch
}) => {
	const { handleFiles, handleClick, fileNames } = useDataImporter()

	return (
		<div className={styles.container}>
			<SubHeading title='Загрузите данные для отчета' />
			<UploadField
				handleFiles={handleFiles}
				fileNames={fileNames}
				{...register('data.temporary.files' as keyof IAnnualReport, {
					required: 'Обязательное поле'
				})}
				error={error}
			/>
			<Button onClick={handleClick}>Прочитать файл</Button>
		</div>
	)
}
export default DataImporter
