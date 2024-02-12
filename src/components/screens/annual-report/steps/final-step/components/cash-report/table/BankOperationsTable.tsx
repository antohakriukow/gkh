import { FC } from 'react'

import { IExtendedBankOperation } from '~/shared/types/annual.interface'

import styles from './table.module.scss'

const BankOperationsTable: FC<{ operations: IExtendedBankOperation[] }> = ({
	operations
}) => {
	return (
		<table>
			<thead>
				<tr>
					<th>Контрагент</th>
					<th>Поступление, руб.</th>
					<th>Списание, руб.</th>
					<th>Документ</th>
					<th>Содержание операции</th>
				</tr>
			</thead>
			<tbody>
				{operations.map(operation => (
					<tr key={operation._id}>
						<td>
							{operation.amount > 0
								? operation.payerName
								: operation.recipientName}
						</td>
						<td>{operation.amount > 0 ? operation.amount.toFixed(2) : ''}</td>
						<td>
							{operation.amount < 0
								? Math.abs(operation.amount).toFixed(2)
								: ''}
						</td>
						<td>{`${operation.amount > 0 ? 'Поступление' : 'Списание'} №${
							operation.documentNumber
						} от ${operation.date}`}</td>
						<td>{operation.paymentPurpose}</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

export default BankOperationsTable
