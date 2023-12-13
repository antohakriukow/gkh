import { servicesFieldsData } from './mocks/services.fields.mock'
import { FC } from 'react'

import { IReportForm } from '../../report-editor.interface'
import styles from '../ReportForm.module.scss'
import ReportFieldNumberWithSwitch from '../fields/ReportFieldNumberWithSwitch'

interface IServicesFieldSet extends IReportForm {}

const ServicesFieldSet: FC<IServicesFieldSet> = ({
	register,
	control,
	watch,
	setValue
}) => {
	const isAdvancedModeOn =
		watch('data.settings.housesCount') === 'many' &&
		watch('data.settings.housesAreSame') === 'no'

	return (
		<>
			<h3 className={styles.blockTitle}>
				Действующие услуги {isAdvancedModeOn ? 'и площади' : ''}
			</h3>
			<div className={styles.fieldSet}>
				{servicesFieldsData.map(field => (
					<ReportFieldNumberWithSwitch
						key={field.name}
						control={control}
						fieldName={field.name}
						switcherName={field.switcherName}
						placeholder={field.placeholder}
						register={register}
						watch={watch}
						setValue={setValue}
					/>
				))}
			</div>
		</>
	)
}

export default ServicesFieldSet
