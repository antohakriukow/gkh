import { organizationDebtsFieldsData } from './data/organization-debts.fields.data'
import { FC } from 'react'
import { FieldError } from 'react-hook-form'

import { IServices } from '~/shared/types/report22gkh.interface'

import { extractLastLink } from '~/utils/string.utils'

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
	const ORGANIZATION_COMMUNAL_DEBTS = 'Долги УО за коммунальные ресурсы'

	const fieldsToShow = organizationDebtsFieldsData.filter(field => {
		const service = extractLastLink(field.name)
		return watch(`data.settings.services.${service as keyof IServices}.status`)
	})

	if (fieldsToShow.length === 0) {
		return null
	}

	return (
		<>
			<h3 className={styles.blockTitle}>{ORGANIZATION_COMMUNAL_DEBTS}</h3>
			<div className={styles.fieldSet}>
				{fieldsToShow.map(field => (
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
			</div>
		</>
	)
}

export default OrganizationDebtsFieldSet
