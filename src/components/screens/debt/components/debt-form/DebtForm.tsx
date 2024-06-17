import AddressFieldSet from './field-sets/AddressFieldSet'
import BankDetailsFieldSet from './field-sets/BankDetailsFieldSet'
import CourtFieldSet from './field-sets/CourtFieldSet'
import DebtorFieldSet from './field-sets/DebtorFieldSet'
import MainDebtsFieldSet from './field-sets/MainDebtsFieldSet'
import OptionsFieldSet from './field-sets/OptionsFieldSet'
import { FC } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { FormContainer } from 'react-hook-form-mui'

import { IDebt } from '~/shared/types/debts/debt.interface'

import styles from './DebtForm.module.scss'

const DebtForm: FC<{
	methods: UseFormReturn<IDebt, any, undefined>
	onSuccess: (data: IDebt) => void
	onError: (errors: any) => void
}> = ({ methods, onSuccess, onError }) => {
	return (
		<FormContainer
			formContext={methods}
			onSuccess={onSuccess}
			onError={onError}
		>
			<div className={styles.form}>
				<AddressFieldSet />
				<DebtorFieldSet />
				<MainDebtsFieldSet />
				<CourtFieldSet />
				<BankDetailsFieldSet />
				<OptionsFieldSet />
			</div>
		</FormContainer>
	)
}

export default DebtForm
