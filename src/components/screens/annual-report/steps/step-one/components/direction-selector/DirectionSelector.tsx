import { useDirectionSelector } from './useDirectionSelector'
import { ChangeEvent, FC } from 'react'

import { SubHeading } from '~/components/ui'

import { TypeAnnualDirection } from '~/shared/types/annual.interface'

import styles from './DirectionSelector.module.scss'

const DirectionSelector: FC = () => {
	const { state, setAccountDirection } = useDirectionSelector()

	const handleDirectionChange = (
		accountNumber: string,
		event: ChangeEvent<HTMLSelectElement>
	) => {
		const newDirection = event.target.value as TypeAnnualDirection
		setAccountDirection({ number: accountNumber, type: newDirection })
	}

	return (
		<div className={styles.container}>
			<SubHeading title='Выберите направления для всех счетов:' />
			{state.accounts.map(account => (
				<div key={account.number} className={styles.account}>
					<p>{account.number}</p>
					<select
						value={account.type || ''}
						onChange={e => handleDirectionChange(account.number, e)}
					>
						<option value=''>Не указано</option>
						<option value='main'>ЖКУ</option>
						<option value='renovation'>Капремонт</option>
						<option value='target'>Целевые взносы</option>
						<option value='commerce'>Коммерция</option>
					</select>
				</div>
			))}
		</div>
	)
}

export default DirectionSelector
