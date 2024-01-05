import AccrualsFieldSet from './field-sets/AccrualsFieldSet'
import IncomeFieldSet from './field-sets/IncomeFieldSet'
import NaturalFieldSet from './field-sets/NaturalFieldSet'
import OrganizationDebtsFieldSet from './field-sets/OrganizationDebtsFieldSet'
import ParametersFieldSet from './field-sets/ParametersFieldSet'
import ResidentsDebtsFieldSet from './field-sets/ResidentsDebtsFieldSet'
import ServicesFieldSet from './field-sets/ServicesFieldSet'
import VatFieldSet from './field-sets/VatFieldSet'
import { FC } from 'react'

import { IReportForm } from '../report-editor.interface'

import styles from './ReportForm.module.scss'

const ReportForm: FC<IReportForm> = ({
	register,
	control,
	formState,
	setValue,
	watch
}) => {
	const fieldSets = [
		ParametersFieldSet,
		ServicesFieldSet,
		AccrualsFieldSet,
		VatFieldSet,
		IncomeFieldSet,
		ResidentsDebtsFieldSet,
		OrganizationDebtsFieldSet,
		NaturalFieldSet
	]

	return (
		<div className={styles.reportForm}>
			{fieldSets.map((FieldSetComponent, index) => (
				<FieldSetComponent
					key={index}
					register={register}
					control={control}
					formState={formState}
					setValue={setValue}
					watch={watch}
				/>
			))}
		</div>
	)
}

export default ReportForm
