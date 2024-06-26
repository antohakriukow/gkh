import { IField } from './form.interface'
import { FieldValues, Path } from 'react-hook-form'
import { Tooltip } from 'react-tooltip'

import { Field } from '~/components/ui'

const FieldNumber = <T extends FieldValues>({
	register,
	placeholder,
	fieldName,
	isRequired,
	error,
	tooltip
}: IField<T>) => {
	return (
		<>
			<Field
				{...register(
					fieldName as Path<T>,
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
export default FieldNumber
