import { FC } from 'react'
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
