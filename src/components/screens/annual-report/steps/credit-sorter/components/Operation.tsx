import cn from 'clsx'
import { FC, memo, useCallback } from 'react'
import { PiCopyBold } from 'react-icons/pi'

import { IExtendedBankOperation } from '~/shared/types/annual.interface'

import { formatNumber } from '~/utils/number.utils'

import styles from './operations.module.scss'

interface IOperationProps {
	operation: IExtendedBankOperation
	toggleOperationSelection: (id: string) => void
	showSeparateButton?: (operation: IExtendedBankOperation) => boolean
	showSeparateModal: (operation: IExtendedBankOperation) => void
	isChecked: boolean
}

const Operation: FC<IOperationProps> = memo(
	({
		operation,
		toggleOperationSelection,
		showSeparateButton,
		showSeparateModal,
		isChecked
	}) => {
		const handleChange = useCallback(() => {
			toggleOperationSelection(operation._id)
		}, [operation, toggleOperationSelection])

		const handleShowSeparateModal = () => showSeparateModal(operation)

		const isShown = showSeparateButton && showSeparateButton(operation)
		const isSeparated = operation.paymentPurpose.includes(': [Часть операции]')

		return (
			<div
				id={operation._id}
				className={cn(styles.operation, {
					[styles.separating]: isShown,
					[styles.separated]: isSeparated
				})}
			>
				<div>{operation.date}</div>
				<div>{formatNumber(operation.amount)}</div>
				<div className={styles.description} title={operation.paymentPurpose}>
					{operation.paymentPurpose}
				</div>
				{isShown && (
					<PiCopyBold
						onClick={handleShowSeparateModal}
						size={20}
						color='#4553a1'
					/>
				)}
				<input type='checkbox' onChange={handleChange} checked={isChecked} />
			</div>
		)
	}
)
export default Operation
