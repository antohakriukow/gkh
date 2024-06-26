import { ISelect } from './form.interface'
import { Controller, FieldValues, Path } from 'react-hook-form'
import { Tooltip } from 'react-tooltip'

import { Select } from '~/components/ui'

const ReportSelect = <T extends FieldValues>({
	control,
	fieldName,
	placeholder,
	options,
	isRequired,
	tooltip
}: ISelect<T>) => {
	return (
		<Controller
			name={fieldName as Path<T>}
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
						options={options ?? null}
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
