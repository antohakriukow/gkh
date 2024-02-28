import SeparateModal from './separate-modal/SeparateModal'
import cn from 'clsx'
import { FC } from 'react'
import { PiCopyBold } from 'react-icons/pi'

import { useAnnualReport } from '~/components/screens/annual-report/useAnnualReport'

import { useModal } from '~/hooks/useModal'

import { IExtendedBankOperation } from '~/shared/types/annual.interface'

import styles from './operations.module.scss'

interface IOperationProps {
	operation: IExtendedBankOperation
	toggleOperationSelection: (id: string) => void
	selectedOperations: string[]
	showSeparateButton?: (operation: IExtendedBankOperation) => boolean
}

const Operation: FC<IOperationProps> = ({
	operation,
	toggleOperationSelection,
	selectedOperations,
	showSeparateButton
}) => {
	const { showModal } = useModal()
	const { lastBankOperationId, annualReportInDBId } = useAnnualReport()

	const handleShowSeparateModal = () => {
		showModal(
			<SeparateModal
				operation={operation}
				lastBankOperationId={lastBankOperationId}
				annualReportInDBId={annualReportInDBId}
				clearSelectedOperation={handleChange}
			/>
		)
	}

	const handleChange = () => {
		toggleOperationSelection(operation._id)
	}

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
			<div>{operation.amount}</div>
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
			<input
				type='checkbox'
				onChange={handleChange}
				checked={selectedOperations.includes(operation._id)}
			/>
		</div>
	)
}
export default Operation
