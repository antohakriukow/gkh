import { debtDirectionOptions, pseudoBooleanOptions } from './data/debtor.data'
import { FC } from 'react'
import { SelectElement, ToggleButtonGroupElement } from 'react-hook-form-mui'

import styles from '../DebtForm.module.scss'
import withToggleHeader from '../components/withToggleHeader/withToggleHeader'

const OptionsFieldSet: FC = () => {
	return (
		<div className={styles.fieldSet}>
			<SelectElement
				options={debtDirectionOptions}
				name={`options.direction`}
				label='Направление'
				fullWidth
				required
				size='small'
				FormHelperTextProps={{
					style: { display: 'none' }
				}}
			/>
			<ToggleButtonGroupElement
				className={styles.selector}
				name='options.withPenalties'
				label='Начислять пени'
				options={pseudoBooleanOptions}
				exclusive
				enforceAtLeastOneSelected
				color='primary'
				required
				size='small'
				rules={{
					required: 'Обязательное поле'
				}}
			/>
		</div>
	)
}

export default withToggleHeader(OptionsFieldSet, 'Параметры')
