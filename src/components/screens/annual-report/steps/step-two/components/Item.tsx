import { FC } from 'react'

import { Field } from '~/components/ui'

import {
	IAnnualReportCategoriesField,
	IAnnualReportCategoriesFormInput
} from '../step-two.interface'

const Item: FC<IAnnualReportCategoriesField> = ({
	register,
	placeholder,
	fieldName,
	isRequired,
	error
}) => {
	return (
		<>
			<Field
				{...register(
					fieldName as keyof IAnnualReportCategoriesFormInput,
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
		</>
	)
}
export default Item
