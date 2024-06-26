import Operation from './components/Operation'
import OperationInfo from './components/OperationInfo'
import { useSeparateModal } from './useSeparateModal'
import { Dispatch, FC, SetStateAction } from 'react'

import { Button, SubHeading } from '~/components/ui'

import { IExtendedBankOperation } from '~/shared/types/annual.interface'

import styles from './SeparateModal.module.scss'

interface ISeparateModal {
	operation: IExtendedBankOperation
	lastBankOperationId: number
	clearSelectedOperation: () => void
	localOperations: IExtendedBankOperation[]
	setLocalOperations: Dispatch<SetStateAction<IExtendedBankOperation[]>>
}

const SeparateModal: FC<ISeparateModal> = ({
	operation,
	lastBankOperationId,
	clearSelectedOperation,
	localOperations,
	setLocalOperations
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
		clearSelectedOperation,
		localOperations,
		setLocalOperations
	)

	const operationTitle = `${
		operation.amount > 0 ? 'Поступление' : 'Списание'
	} №${operation.documentNumber} от ${operation.date}: `
	const partnerName =
		operation.amount > 0 ? operation.payerName : operation.recipientName

	return (
		<div className={styles.container}>
			<SubHeading title='Разделение операции' />
			<OperationInfo title='Контрагент: ' description={partnerName} />
			<OperationInfo
				title={operationTitle}
				description={operation.paymentPurpose}
			/>
			<div className={styles.header}>
				<p>№ операции</p>
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
