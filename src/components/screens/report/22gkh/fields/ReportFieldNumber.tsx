import { FC } from 'react'

import { Field } from '~/components/ui'

import { IReport } from '~/shared/types/report.interface'

import { IReportField } from '../../report-editor.interface'

const ReportFieldNumber: FC<IReportField> = ({
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
				isRequired
					? {
							valueAsNumber: true,
							required: 'Обязательное поле'
					  }
					: { valueAsNumber: true }
			)}
			error={error}
			placeholder={placeholder}
			type='number'
			autoComplete='off'
		/>
	)
}
export default ReportFieldNumber
