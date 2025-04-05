import { currentYear, monthOptions, yearOptions } from './data/main-debts.data'
import { FC } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { Button } from '~/components/ui'

import { IDebt, TypeDebt } from '~/shared/types/debts/debt.interface'
import { toTypeYear } from '~/shared/types/period.interface'

import {
	incrementDate,
	incrementMonth,
	incrementYear
} from '~/utils/period.utils'

import DebtRow from '../components/debt-row/DebtRow'
import withToggleHeader from '../components/withToggleHeader/withToggleHeader'

const MainDebtsFieldSet: FC = () => {
	const { control, getValues } = useFormContext<IDebt>()
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'main.data'
	})

	const handleAddPeriod = () => {
		const previousYear = toTypeYear(currentYear - 1)
		const values = getValues()
		const lastField = values.main.data.at(-1)
		const lastStartDate = lastField?.startDate ?? `01.12.${previousYear}`
		const newStartDate = incrementDate(lastStartDate)

		append({
			type: TypeDebt.main,
			period: {
				month: incrementMonth(lastField?.period?.month ?? 12),
				year: incrementYear(
					lastField?.period?.month ?? 12,
					lastField?.period?.year ?? previousYear
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
