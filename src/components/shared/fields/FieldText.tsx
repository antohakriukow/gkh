import { IField } from './form.interface'
import { FieldValues, Path, RegisterOptions } from 'react-hook-form'
import { Tooltip } from 'react-tooltip'

import { Field } from '~/components/ui'

import { validEmail, validPhone } from '~/shared/regex'

const FieldText = <T extends FieldValues>({
	register,
	placeholder,
	fieldName,
	isRequired,
	error,
	tooltip
}: IField<T>) => {
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
		<>
			<Field
				{...register(fieldName as Path<T>, parameters)}
				error={error}
				placeholder={placeholder}
				type='text'
				autoComplete='off'
				data-tooltip-id={fieldName}
				data-tooltip-content={tooltip}
				data-tooltip-place='left'
			/>
			{tooltip && <Tooltip id={fieldName} delayShow={200} />}
		</>
	)
}
export default FieldText
