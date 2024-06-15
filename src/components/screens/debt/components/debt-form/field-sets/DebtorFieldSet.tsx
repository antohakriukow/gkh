import {
	CounterPartyTypes,
	debtorTypeOptions,
	entityDebtorInputs,
	individualDebtorInputs,
	individualIdentifiersOptions
} from './data/debtor.data'
import { FC, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { SelectElement, TextFieldElement } from 'react-hook-form-mui'

import { IDebt } from '~/shared/types/debts/debt.interface'

import { getIdentifierValueName } from '~/utils/debt/debt'

import styles from '../DebtForm.module.scss'
import withToggleHeader from '../components/withToggleHeader/withToggleHeader'

const DebtorFieldSet: FC = () => {
	const { watch, setValue } = useFormContext<IDebt>()

	const address = watch('address')

	const debtorType = watch('debtor.type')
	const identifierType = watch('debtor.data.identifier.type')
	const identifierValueName = getIdentifierValueName(identifierType)

	useEffect(() => {
		debtorType === CounterPartyTypes.individual
			? setValue('debtor.data.livingAddress', address)
			: setValue('debtor.data.livingAddress', '')
	}, [debtorType, address, setValue])

	return (
		<div className={styles.fieldSet}>
			<SelectElement
				name='debtor.type'
				label='Тип должника'
				fullWidth
				required
				FormHelperTextProps={{
					style: { display: 'none' }
				}}
				options={debtorTypeOptions}
			/>

			{debtorType === CounterPartyTypes.entity &&
				(
					Object.entries(entityDebtorInputs) as [
						keyof typeof entityDebtorInputs,
						string
					][]
				).map(([key, placeholder]) => (
					<TextFieldElement
						key={key}
						name={`debtor.data.${key}`}
						label={placeholder}
						variant='outlined'
						fullWidth
						margin='normal'
						required
						FormHelperTextProps={{
							style: { display: 'none' }
						}}
					/>
				))}

			{debtorType === CounterPartyTypes.individual &&
				(
					Object.entries(individualDebtorInputs) as [
						keyof typeof individualDebtorInputs,
						string
					][]
				).map(([key, placeholder]) => (
					<TextFieldElement
						key={key}
						name={`debtor.data.${key}`}
						label={placeholder}
						variant='outlined'
						fullWidth
						margin='normal'
						required={key !== 'birthDate' && key !== 'birthPlace'}
						FormHelperTextProps={{
							style: { display: 'none' }
						}}
					/>
				))}

			{debtorType === CounterPartyTypes.individual && (
				<SelectElement
					name='debtor.data.identifier.type'
					label='Тип идентификатора'
					fullWidth
					required
					FormHelperTextProps={{
						style: { display: 'none' }
					}}
					options={individualIdentifiersOptions}
				/>
			)}

			{identifierType && (
				<TextFieldElement
					name='debtor.data.identifier.value'
					label={identifierValueName}
					variant='outlined'
					fullWidth
					margin='normal'
					required
					FormHelperTextProps={{
						style: { display: 'none' }
					}}
				/>
			)}
		</div>
	)
}

export default withToggleHeader(DebtorFieldSet, 'Должник')
