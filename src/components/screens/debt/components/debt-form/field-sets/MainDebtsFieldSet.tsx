import { monthOptions, yearOptions } from './data/main-debts.data'
import { FC } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { Button } from '~/components/ui'

import { IDebt, TypeDebt } from '~/shared/types/debts/debt.interface'
import { TypeMonth, TypeYear } from '~/shared/types/period.interface'

import {
	incrementDate,
	incrementMonth,
	incrementYear
} from '~/utils/period.utils'

import DebtRow from '../components/debt-row/DebtRow'
import withToggleHeader from '../components/withToggleHeader/withToggleHeader'

const MainDebtsFieldSet: FC = () => {
	const { control } = useFormContext<IDebt>()
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'main.data'
	})

	const handleAddPeriod = () => {
		const lastField = fields.at(-1)
		const lastStartDate = lastField?.startDate ?? '01.12.2023'
		const newStartDate = incrementDate(lastStartDate)

		append({
			type: TypeDebt.main,
			period: {
				month: incrementMonth(lastField?.period?.month ?? 12),
				year: incrementYear(
					lastField?.period?.month ?? 12,
					lastField?.period?.year ?? 2023
				)
			},
			value: '',
			startDate: newStartDate
		})
	}

	return (
		<>
			{fields.map((_, index) => (
				<DebtRow
					key={index}
					index={index}
					monthOptions={monthOptions}
					yearOptions={yearOptions}
					remove={remove}
				/>
			))}
			<Button title='Добавить' onClick={handleAddPeriod} />
		</>
	)
}

export default withToggleHeader(MainDebtsFieldSet, 'Долг')
