import { ChangeEvent, Dispatch, FC, Fragment, SetStateAction } from 'react'

import {
	IAccount,
	TypeAnnualDirection,
	TypeAnnualReportStructure
} from '~/shared/types/annual.interface'

import styles from './direction-selector.module.scss'

interface IDirectionSelectorProps {
	annualAccounts: IAccount[]
	setAnnualAccounts: Dispatch<SetStateAction<IAccount[]>>
	structure: TypeAnnualReportStructure | undefined
}

const DirectionSelector: FC<IDirectionSelectorProps> = ({
	annualAccounts,
	setAnnualAccounts,
	structure
}) => {
	const setAccountDirection = (account: IAccount) => {
		const updatedAccounts = annualAccounts.map(acc =>
			acc.number === account.number ? { ...acc, type: account.type } : acc
		)

		setAnnualAccounts(updatedAccounts)
	}

	const handleDirectionChange = (
		accountNumber: string,
		event: ChangeEvent<HTMLSelectElement>
	) => {
		const newDirection = event.target.value as TypeAnnualDirection
		setAccountDirection({ number: accountNumber, type: newDirection })
	}

	return (
		<Fragment>
			<div className={styles.accounts}>
				{[...annualAccounts]
					.sort((a, b) => +a.number - +b.number)
					.map(account => (
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
								{structure === 'accruals/services' && (
									<option value='commerce'>Коммерция</option>
								)}
							</select>
						</div>
					))}
			</div>
			<div className={styles.resume}>
				{structure === 'accruals/services' && (
					<p>
						В выборку попали счета бухгалтерского учета c 80 по 86. Убедитесь,
						что на конец отчетного периода отсутствует сальдо по счетам 20-29,
						40-46, 90, 91, 94, 97, 98, 99.
					</p>
				)}
			</div>
		</Fragment>
	)
}

export default DirectionSelector
