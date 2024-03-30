import Selector from './components/Selector'
import { accrualsNotice } from './direction-selector.data'
import { ChangeEvent, FC, Fragment } from 'react'

import { IAccount, TypeAnnualDirection } from '~/shared/types/annual.interface'

import { useDataUploaderContext } from '../../provider/provider'

import styles from './direction-selector.module.scss'

const DirectionSelector: FC = () => {
	const { annualAccounts, setAnnualAccounts, structure } =
		useDataUploaderContext()

	const isAccrualsStructure = structure === 'accruals/services'
	const sortedAccounts = annualAccounts.sort((a, b) => +a.number - +b.number)

	const setAccountDirection = (account: IAccount) => {
		const updatedAccounts = annualAccounts.map((acc: IAccount) =>
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
				{sortedAccounts.map(account => (
					<Selector
						key={account.number}
						account={account}
						handleDirectionChange={handleDirectionChange}
						isAccrualsStructure={isAccrualsStructure}
					/>
				))}
			</div>
			{isAccrualsStructure && (
				<div className={styles.resume}>
					<p>{accrualsNotice}</p>
				</div>
			)}
		</Fragment>
	)
}

export default DirectionSelector
