import { organizationDebtsFieldsData } from './mocks/organization-debts.fields.mock'
import { FC } from 'react'
import { FieldError } from 'react-hook-form'

import { IReportForm } from '../../report-editor.interface'
import styles from '../ReportForm.module.scss'
import ReportFieldNumber from '../fields/ReportFieldNumber'

interface IOrganizationDebtsFieldSet extends IReportForm {}

const OrganizationDebtsFieldSet: FC<IOrganizationDebtsFieldSet> = ({
	register,
	control,
	formState,
	watch
}) => {
	const errors = formState?.errors
	const isGasRequired = watch('data.gas.status') !== 'none'

	return (
		<>
			<h3 className={styles.blockTitle}>Долги УО за коммунальные ресурсы</h3>
			<div className={styles.fieldSet}>
				{organizationDebtsFieldsData.map(field => (
					<ReportFieldNumber
						key={field.name}
						control={control}
						fieldName={field.name}
						placeholder={field.placeholder}
						register={register}
						error={
							errors[field.name as keyof typeof errors] as
								| FieldError
								| undefined
						}
					/>
				))}

				{isGasRequired && (
					<ReportFieldNumber
						control={control}
						fieldName='data.organizationDebts.gas'
						placeholder='Газоснабжение'
						register={register}
						error={errors?.data?.organizationDebts?.gas}
					/>
				)}
			</div>
		</>
	)
}

export default OrganizationDebtsFieldSet
