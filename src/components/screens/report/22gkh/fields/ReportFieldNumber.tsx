import { FC } from 'react'
import { Tooltip } from 'react-tooltip'

import { Field } from '~/components/ui'

import { IReport } from '~/shared/types/report.interface'

import { IReportField } from '../../report-editor.interface'

const ReportFieldNumber: FC<IReportField> = ({
	register,
	placeholder,
	fieldName,
	isRequired,
	error,
	tooltip
}) => {
	return (
		<>
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
				data-tooltip-id={fieldName}
				data-tooltip-content={tooltip}
				data-tooltip-place='left'
			/>
			{tooltip && <Tooltip id={fieldName} delayShow={200} />}
		</>
	)
}
export default ReportFieldNumber
