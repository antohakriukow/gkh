import { FC } from 'react'
import { Controller } from 'react-hook-form'
import { Tooltip } from 'react-tooltip'

import { Select } from '~/components/ui'

import { IReport } from '~/shared/types/report.interface'

import { IReportSelect } from '../../report-editor.interface'

const ReportSelect: FC<IReportSelect> = ({
	control,
	fieldName,
	placeholder,
	options,
	isRequired,
	tooltip
}) => {
	return (
		<Controller
			name={fieldName as keyof IReport}
			control={control}
			rules={{
				required: 'Обязательное поле'
			}}
			render={({ field, fieldState: { error } }) => (
				<>
					<Select
						error={error}
						field={field}
						placeholder={placeholder}
						options={options}
						isRequired={isRequired}
						data-tooltip-id={fieldName}
						data-tooltip-content={tooltip}
						data-tooltip-place='left'
					/>
					{tooltip && <Tooltip id={fieldName} delayShow={200} />}
				</>
			)}
		/>
	)
}

export default ReportSelect
