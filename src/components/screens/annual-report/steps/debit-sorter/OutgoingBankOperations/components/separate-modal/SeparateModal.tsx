import Operation from './Operation'
import { useSeparateModal } from './useSeparateModal'
import { FC, useState } from 'react'

import { Button } from '~/components/ui'

import { IExtendedBankOperation } from '~/shared/types/annual.interface'

import styles from './SeparateModal.module.scss'

interface ISeparateModal {
	operation: IExtendedBankOperation
	lastBankOperationId: number
	annualReportInDBId: string | undefined
	clearSelectedOperation: () => void
}

const SeparateModal: FC<ISeparateModal> = ({
	operation,
	lastBankOperationId,
	annualReportInDBId,
	clearSelectedOperation
}) => {
	const {
		operations,
		handleAddOperation,
		handleRemoveOperation,
		handleAmountChange,
		handleSubmit,
		isOperationsChanged,
		isTotalAmountAbsExcess,
		hasWrongAmountValue
	} = useSeparateModal(
		operation,
		lastBankOperationId,
		annualReportInDBId,
		clearSelectedOperation
	)

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<p>Контрагент</p>
				<p>Сумма</p>
			</div>
			{operations.map((operation, index) => (
				<Operation
					key={index}
					operation={operation}
					handleAdd={handleAddOperation}
					handleRemove={handleRemoveOperation}
					handleAmountChange={handleAmountChange}
					index={index}
					isLast={index === operations.length - 1}
				/>
			))}
			{isTotalAmountAbsExcess && (
				<div className={styles.error}>
					Общая сумма операций превышает исходную
				</div>
			)}
			{isOperationsChanged && (
				<Button
					disabled={isTotalAmountAbsExcess || hasWrongAmountValue}
					onClick={handleSubmit}
				>
					Сохранить изменения
				</Button>
			)}
		</div>
	)
}

export default SeparateModal
