import { Tooltip } from '@mui/material'
import { FC } from 'react'
import { useFormContext } from 'react-hook-form'
import { TextFieldElement } from 'react-hook-form-mui'

import { IDebt } from '~/shared/types/debts/debt.interface'

import styles from '../DebtForm.module.scss'
import withToggleHeader from '../components/withToggleHeader/withToggleHeader'

const AddressFieldSet: FC = () => {
	const {
		formState: { errors }
	} = useFormContext<IDebt>()

	return (
		<div className={styles.fieldSet}>
			<Tooltip
				title='Например: 100000, г. Москва, Волоколамское шоссе'
				placement='bottom'
			>
				<TextFieldElement
					name='address.house'
					label='Адрес дома'
					variant='outlined'
					size='small'
					fullWidth
					required
					error={!!errors.address?.house}
					FormHelperTextProps={{
						style: { display: 'none' }
					}}
				/>
			</Tooltip>
			<Tooltip title='Например: пом. 12Н или кв. 42' placement='bottom'>
				<TextFieldElement
					name='address.room'
					label='Номер квартиры (помещения)'
					variant='outlined'
					size='small'
					fullWidth
					required
					error={!!errors.address?.room}
					FormHelperTextProps={{
						style: { display: 'none' }
					}}
				/>
			</Tooltip>
		</div>
	)
}

export default withToggleHeader(AddressFieldSet, 'Адрес')
