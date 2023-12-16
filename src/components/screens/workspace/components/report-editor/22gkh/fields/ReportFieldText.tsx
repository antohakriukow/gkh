import { FC } from 'react'

import { Field } from '~/components/ui'

import { IReport } from '~/shared/types/report.interface'

import { IReportField } from '../../report-editor.interface'

const ReportFieldText: FC<IReportField> = ({
	register,
	placeholder,
	fieldName,
	isRequired,
	error
}) => {
	return (
		<Field
			{...register(
				fieldName as keyof IReport,
				isRequired ? { required: 'Обязательное поле' } : {}
			)}
			error={error}
			placeholder={placeholder}
			type='text'
			autoComplete='off'
		/>
	)
}
export default ReportFieldText
