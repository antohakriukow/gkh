import { FC } from 'react'
import { useFormContext } from 'react-hook-form'
import { TextFieldElement } from 'react-hook-form-mui'

import { IDebt } from '~/shared/types/debts/debt.interface'

import styles from '../DebtForm.module.scss'
import withToggleHeader from '../components/withToggleHeader/withToggleHeader'

const BankDetailsFieldSet: FC = () => {
	const {
		formState: { errors }
	} = useFormContext<IDebt>()

	return (
		<div className={styles.fieldSet}>
			<TextFieldElement
				name='collector.bankDetails.account'
				label='Расчетный счет'
				variant='outlined'
				size='small'
				fullWidth
				required
				error={!!errors.collector?.bankDetails?.account}
				FormHelperTextProps={{
					style: { display: 'none' }
				}}
			/>
			<TextFieldElement
				name='collector.bankDetails.bank.name'
				label='Название банка'
				variant='outlined'
				size='small'
				fullWidth
				required
				error={!!errors.collector?.bankDetails?.bank?.name}
				FormHelperTextProps={{
					style: { display: 'none' }
				}}
			/>
			<TextFieldElement
				name='collector.bankDetails.bank.bik'
				label='БИК банка'
				variant='outlined'
				size='small'
				fullWidth
				required
				error={!!errors.collector?.bankDetails?.bank?.bik}
				FormHelperTextProps={{
					style: { display: 'none' }
				}}
			/>
			<TextFieldElement
				name='collector.bankDetails.bank.correspondentAccount'
				label='Корреспондентский счет'
				variant='outlined'
				size='small'
				fullWidth
				required
				error={!!errors.collector?.bankDetails?.bank?.correspondentAccount}
				FormHelperTextProps={{
					style: { display: 'none' }
				}}
			/>
		</div>
	)
}

export default withToggleHeader(
	BankDetailsFieldSet,
	'Банковские реквизиты истца'
)
