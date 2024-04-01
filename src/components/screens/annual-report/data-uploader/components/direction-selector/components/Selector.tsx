import { commerceOption, options } from './selector-options.data'
import { ChangeEvent, FC } from 'react'

import { IAccount } from '~/shared/types/annual.interface'

import styles from '../direction-selector.module.scss'

interface ISelectorProps {
	account: IAccount
	handleDirectionChange: (
		accountNumber: string,
		event: ChangeEvent<HTMLSelectElement>
	) => void
	isAccrualsStructure: boolean
}

const Selector: FC<ISelectorProps> = ({
	account,
	handleDirectionChange,
	isAccrualsStructure
}) => {
	return (
		<div key={account.number} className={styles.account}>
			<p>{account.number}</p>
			<select
				value={account.type || ''}
				onChange={e => handleDirectionChange(account.number, e)}
			>
				{options.map(({ value, title }) => (
					<option key={value} value={value}>
						{title}
					</option>
				))}
				{isAccrualsStructure && (
					<option value={commerceOption.value}>{commerceOption.title}</option>
				)}
			</select>
		</div>
	)
}
export default Selector
