import { FC } from 'react'
import { Control } from 'react-hook-form'

import { SubHeading, UploadField } from '~/components/ui'

import { IAnnualReportSettings } from '~/shared/types/annual.interface'

import styles from './DataImporter.module.scss'

interface IDataImporterProps {
	control: Control<IAnnualReportSettings>
}

const DataImporter: FC<IDataImporterProps> = ({ control }) => {
	return (
		<div className={styles.container}>
			<SubHeading title='Загрузите данные для отчета' />
			<UploadField />
		</div>
	)
}
export default DataImporter
