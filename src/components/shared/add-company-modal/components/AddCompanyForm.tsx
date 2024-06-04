import { IAddCompanyFormProps } from './add-company-modal.interface'
import { FC } from 'react'

import { Button, Field } from '~/components/ui'

import styles from './add-company-modal.module.scss'

const AddCompanyForm: FC<IAddCompanyFormProps> = ({
	register,
	handleSubmit,
	onSubmit,
	formState,
	watch,
	errors
}) => {
	const { isValid } = formState
	const isEmpty = !watch('inn')

	const SEARCH = 'Найти'
	const INVALID_INN = 'Найти'
	const FILL_INN = 'Введите ИНН'

	return (
		<div className={styles.formContainer}>
			<Field
				{...register('inn', {
					minLength: {
						value: 10,
						message: INVALID_INN
					},
					maxLength: {
						value: 10,
						message: INVALID_INN
					}
				})}
				error={errors.inn}
				placeholder={FILL_INN}
				type='number'
				autoComplete='off'
				step='1'
			/>
			<Button
				title={SEARCH}
				disabled={!isValid || isEmpty}
				onClick={handleSubmit(data => onSubmit(data))}
			/>
		</div>
	)
}
export default AddCompanyForm
