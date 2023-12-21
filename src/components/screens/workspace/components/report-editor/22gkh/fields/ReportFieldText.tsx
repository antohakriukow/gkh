import { FC } from 'react'
import { RegisterOptions } from 'react-hook-form'

import { Field } from '~/components/ui'

import { validEmail, validPhone } from '~/shared/regex'
import { IReport } from '~/shared/types/report.interface'

import { IReportField } from '../../report-editor.interface'

const ReportFieldText: FC<IReportField> = ({
	register,
	placeholder,
	fieldName,
	isRequired,
	error
}) => {
	const parameters = {} as RegisterOptions
	if (isRequired) parameters.required = 'Обязательное поле'
	if (fieldName?.toLowerCase().includes('email'))
		parameters.pattern = {
			value: validEmail,
			message: 'Невалидный email'
		}

	if (fieldName?.toLowerCase().includes('phone'))
		parameters.pattern = {
			value: validPhone,
			message: 'Невалидный номер'
		}

	return (
		<Field
			{...register(fieldName as keyof IReport, parameters)}
			error={error}
			placeholder={placeholder}
			type='text'
			autoComplete='off'
		/>
	)
}
export default ReportFieldText