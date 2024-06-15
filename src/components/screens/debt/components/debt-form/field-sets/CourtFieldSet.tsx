import { courtTypeOptions } from './data/debtor.data'
import { FC } from 'react'
import { useFormContext } from 'react-hook-form'
import { SelectElement, TextFieldElement } from 'react-hook-form-mui'

import { IDebt } from '~/shared/types/debts/debt.interface'

import styles from '../DebtForm.module.scss'
import withToggleHeader from '../components/withToggleHeader/withToggleHeader'

const CourtFieldSet: FC = () => {
	const { watch } = useFormContext<IDebt>()

	const courtType = watch('court.type')

	return (
		<div className={styles.fieldSet}>
			<SelectElement
				name='court.type'
				label='Тип суда'
				fullWidth
				required
				FormHelperTextProps={{
					style: { display: 'none' }
				}}
				options={courtTypeOptions}
			/>

			{!!courtType && (
				<>
					<TextFieldElement
						name='court.name'
						label='Название суда'
						variant='outlined'
						fullWidth
						margin='normal'
						required
						FormHelperTextProps={{
							style: { display: 'none' }
						}}
					/>
					<TextFieldElement
						name='court.address'
						label='Адрес суда'
						variant='outlined'
						fullWidth
						margin='normal'
						required
						FormHelperTextProps={{
							style: { display: 'none' }
						}}
					/>
				</>
			)}
		</div>
	)
}

export default withToggleHeader(CourtFieldSet, 'Суд')
