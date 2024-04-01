import { IOperationProps } from './sorter.interface'
import cn from 'clsx'
import { FC, memo, useCallback } from 'react'
import { PiCopyBold } from 'react-icons/pi'

import { formatNumber } from '~/utils/number.utils'

import styles from './sorter.module.scss'

const Operation: FC<IOperationProps> = memo(
	({
		operation,
		toggleOperationSelection,
		showSeparateButton,
		showSeparateModal,
		isChecked
	}) => {
		const handleOperationSelectionChange = useCallback(() => {
			toggleOperationSelection(operation._id)
		}, [operation, toggleOperationSelection])

		const handleShowSeparateModal = () => showSeparateModal(operation)

		const isSeparateButtonVisible =
			showSeparateButton && showSeparateButton(operation)
		const isSeparated = operation.paymentPurpose.includes(': [Часть операции]')

		return (
			<div
				id={operation._id}
				className={cn(styles.operation, {
					[styles.separating]: isSeparateButtonVisible,
					[styles.separated]: isSeparated
				})}
			>
				<div>{operation.date}</div>
				<div>{formatNumber(operation.amount)}</div>
				<div className={styles.description} title={operation.paymentPurpose}>
					{operation.paymentPurpose}
				</div>
				{isSeparateButtonVisible && (
					<PiCopyBold
						onClick={handleShowSeparateModal}
						size={20}
						color='#4553a1'
					/>
				)}
				<input
					type='checkbox'
					onChange={handleOperationSelectionChange}
					checked={isChecked}
				/>
			</div>
		)
	}
)
export default Operation
