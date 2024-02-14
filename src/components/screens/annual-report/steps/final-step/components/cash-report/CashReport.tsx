import BankOperationsTable from './table/BankOperationsTable'
import { FC } from 'react'
import { getAnnualDirectionTitle } from '~/core/annual/shared'

import { SubHeading } from '~/components/ui'

import {
	IExtendedBankOperation,
	TypeAnnualDirection
} from '~/shared/types/annual.interface'
import { ICompany } from '~/shared/types/company.interface'

import styles from './CashReport.module.scss'

const CashReport: FC<{
	operations: IExtendedBankOperation[]
	company: ICompany
}> = ({ operations, company }) => {
	return (
		<div className={styles.container}>
			<h4>{`Отчет об исполнении сметы ${company.name.short}`}</h4>
			{(
				['main', 'renovation', 'commerce', 'target'] as TypeAnnualDirection[]
			).map(direction => {
				const filteredOperations = operations.filter(
					operation => operation.direction === direction
				)
				return filteredOperations.length > 0 ? (
					<div key={direction}>
						<SubHeading title={getAnnualDirectionTitle(direction)} />
						<BankOperationsTable
							key={direction}
							operations={filteredOperations}
						/>
					</div>
				) : null
			})}
		</div>
	)
}
export default CashReport
