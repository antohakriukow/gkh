import { attachmentsOptions } from './data/attachments.data'
import { debtDirectionOptions } from './data/debtor.data'
import { FC } from 'react'
import { MultiSelectElement, SelectElement } from 'react-hook-form-mui'

import styles from '../DebtForm.module.scss'
import withToggleHeader from '../components/withToggleHeader/withToggleHeader'

const OptionsFieldSet: FC = () => {
	return (
		<div className={styles.fieldSet}>
			<SelectElement
				options={debtDirectionOptions}
				name='options.direction'
				label='Направление'
				fullWidth
				required
				size='small'
				FormHelperTextProps={{
					style: { display: 'none' }
				}}
			/>
			<MultiSelectElement
				name='options.attachments'
				label='Приложения к заявлению'
				options={attachmentsOptions}
				size='small'
				showChips
				showCheckbox
				menuMaxHeight={128}
			/>
		</div>
	)
}

export default withToggleHeader(OptionsFieldSet, 'Параметры')
