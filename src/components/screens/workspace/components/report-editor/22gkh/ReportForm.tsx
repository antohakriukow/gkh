import AccrualsFieldSet from './field-sets/AccrualsFieldSet'
import IncomeFieldSet from './field-sets/IncomeFieldSet'
import OrganizationDebtsFieldSet from './field-sets/OrganizationDebtsFieldSet'
import ParametersFieldSet from './field-sets/ParametersFieldSet'
import ResidentsDebtsFieldSet from './field-sets/ResidentsDebtsFieldSet'
import { FC } from 'react'

import { IReportForm } from '../report-editor.interface'

import styles from './ReportForm.module.scss'

const ReportForm: FC<IReportForm> = ({
	register,
	control,
	formState,
	watch
}) => {
	const fieldSets = [
		ParametersFieldSet,
		IncomeFieldSet,
		ResidentsDebtsFieldSet,
		OrganizationDebtsFieldSet,
		AccrualsFieldSet
	]

	return (
		<div className={styles.reportForm}>
			{fieldSets.map((FieldSetComponent, index) => (
				<FieldSetComponent
					key={index}
					register={register}
					control={control}
					formState={formState}
					watch={watch}
				/>
			))}
		</div>
	)
}

export default ReportForm
