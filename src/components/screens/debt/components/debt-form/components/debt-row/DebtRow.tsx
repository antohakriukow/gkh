import { formatDateValue } from './formatDateValue'
import { formatNumberValue } from './formatNumberValue'
import { FC, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { SelectElement, TextFieldElement } from 'react-hook-form-mui'
import { RiDeleteBin2Line } from 'react-icons/ri'

import { validateDate, validateNumber } from '~/utils/input-validation'

import styles from './debtRow.module.scss'

interface IOption {
	label: string
	id: number
}

interface Props {
	index: number
	monthOptions: IOption[]
	yearOptions: IOption[]
	remove: (index?: number | number[] | undefined) => void
}

const DebtRow: FC<Props> = ({ index, monthOptions, yearOptions, remove }) => {
	const { setValue, watch } = useFormContext()

	const startDate = watch(`main.data[${index}].startDate`)
	const value = watch(`main.data[${index}].value`)

	useEffect(() => {
		if (startDate) {
			const formattedValue = formatDateValue(startDate)
			if (startDate !== formattedValue) {
				setValue(`main.data[${index}].startDate`, formattedValue)
			}
		}
	}, [startDate, setValue, index])

	useEffect(() => {
		if (value) {
			const formattedValue = formatNumberValue(value)
			if (value !== formattedValue) {
				setValue(`main.data[${index}].value`, formattedValue)
			}
		}
	}, [value, setValue, index])

	return (
		<div key={index} className={styles.debtRow}>
			<SelectElement
				options={monthOptions}
				name={`main.data[${index}].period.month`}
				label='Месяц'
				required
				size='small'
			/>
			<SelectElement
				options={yearOptions}
				name={`main.data[${index}].period.year`}
				label='Год'
				required
				size='small'
			/>
			<TextFieldElement
				name={`main.data[${index}].value`}
				label='Сумма'
				required
				size='small'
				placeholder='0000.00'
				rules={{
					validate: validateNumber,
					required: 'Введите сумму'
				}}
			/>
			<div className={styles.inputWithButton}>
				<TextFieldElement
					name={`main.data[${index}].startDate`}
					label='Первый день просрочки'
					required
					size='small'
					placeholder='ДД.ММ.ГГГГ'
					rules={{
						validate: validateDate,
						required: 'Введите дату'
					}}
				/>
				<RiDeleteBin2Line
					onClick={() => remove(index)}
					size={24}
					color='#db3140'
				/>
			</div>
		</div>
	)
}

export default DebtRow
