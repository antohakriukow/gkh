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
				title='Например: 100000, г. Москва, Волоколамское шоссе, пом. 12Н'
				placement='bottom'
			>
				<TextFieldElement
					name='address'
					label='Адрес помещения, по которому имеется долг'
					variant='outlined'
					size='small'
					fullWidth
					required
					error={!!errors.address}
					FormHelperTextProps={{
						style: { display: 'none' }
					}}
				/>
			</Tooltip>
		</div>
	)
}

export default withToggleHeader(AddressFieldSet, 'Адрес')
