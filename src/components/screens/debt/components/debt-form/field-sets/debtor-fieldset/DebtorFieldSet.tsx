import { formatNumberWithMaxLength } from './validation/formatNumberWithMaxLength'
import { formatSeriesAndNumber } from './validation/formatSeriesAndNumber'
import { formatSnilsValue } from './validation/formatSnilsValue'
import { FC, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { SelectElement, TextFieldElement } from 'react-hook-form-mui'

import {
	CounterPartyTypes,
	IdentifierTypes,
	TypeIdentifier
} from '~/shared/types/debts/counter-party.interface'
import { IDebt } from '~/shared/types/debts/debt.interface'

import { getIdentifierValueName } from '~/utils/debt/debt'

import styles from '../../DebtForm.module.scss'
import withToggleHeader from '../../components/withToggleHeader/withToggleHeader'
import {
	debtorTypeOptions,
	entityDebtorInputs,
	individualDebtorInputs,
	individualIdentifiersOptions
} from '../data/debtor.data'

const DebtorFieldSet: FC = () => {
	const { watch, setValue } = useFormContext<IDebt>()

	const house = watch('address.house')
	const room = watch('address.room')

	const debtorType = watch('debtor.type')
	const identifierType = watch('debtor.data.identifier.type')
	const identifierValue = watch('debtor.data.identifier.value')
	const identifierValueName = getIdentifierValueName(identifierType)

	const isPassport = identifierType === IdentifierTypes.passport
	const isDriverLicense = identifierType === IdentifierTypes.driverLicense
	const isSnils = identifierType === IdentifierTypes.snils
	const isInn = identifierType === IdentifierTypes.inn
	const isOgrnip = identifierType === IdentifierTypes.ogrnip

	const isIndividual = debtorType === CounterPartyTypes.individual
	const isEntity = debtorType === CounterPartyTypes.entity

	useEffect(() => {
		debtorType === CounterPartyTypes.individual
			? setValue('debtor.data.livingAddress', `${house}, ${room}`)
			: setValue('debtor.data.livingAddress', '')
	}, [debtorType, house, room, setValue])

	useEffect(() => {
		if (!identifierValue) return
		let formattedValue

		if (isPassport || isDriverLicense)
			formattedValue = formatSeriesAndNumber(identifierValue)
		if (isSnils) formattedValue = formatSnilsValue(identifierValue)
		if (isInn)
			formattedValue = formatNumberWithMaxLength(
				identifierValue,
				isIndividual ? 12 : 10
			)
		if (isOgrnip)
			formattedValue = formatNumberWithMaxLength(identifierValue, 15)

		if (!!formattedValue && identifierValue !== formattedValue)
			setValue('debtor.data.identifier.value', formattedValue)
	}, [
		isIndividual,
		isEntity,
		isPassport,
		isDriverLicense,
		isSnils,
		isInn,
		isOgrnip,
		identifierValue,
		identifierType,
		setValue
	])

	return (
		<div className={styles.fieldSet}>
			<SelectElement
				name='debtor.type'
				label='Тип должника'
				fullWidth
				required
				size='small'
				FormHelperTextProps={{
					style: { display: 'none' }
				}}
				options={debtorTypeOptions}
			/>

			{isEntity &&
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
						size='small'
						FormHelperTextProps={{
							style: { display: 'none' }
						}}
					/>
				))}

			{isIndividual &&
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
						size='small'
						FormHelperTextProps={{
							style: { display: 'none' }
						}}
					/>
				))}

			{isIndividual && (
				<SelectElement
					name='debtor.data.identifier.type'
					label='Тип идентификатора'
					fullWidth
					required
					size='small'
					FormHelperTextProps={{
						style: { display: 'none' }
					}}
					options={individualIdentifiersOptions}
				/>
			)}

			{identifierType && isIndividual && (
				<TextFieldElement
					name='debtor.data.identifier.value'
					label={identifierValueName}
					variant='outlined'
					fullWidth
					margin='normal'
					required
					size='small'
					FormHelperTextProps={{
						style: { display: 'none' }
					}}
				/>
			)}
		</div>
	)
}

export default withToggleHeader(DebtorFieldSet, 'Должник')
