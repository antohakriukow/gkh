import { useState } from 'react'

import { useAnnualReport } from '~/components/screens/annual-report/useAnnualReport'

import { useAnnual } from '~/hooks/useAnnual'
import { useAuth } from '~/hooks/useAuth'
import { useModal } from '~/hooks/useModal'

import { IExtendedBankOperation } from '~/shared/types/annual.interface'

import { AnnualService } from '~/services/annual.service'

export const useSeparateModal = (
	operation: IExtendedBankOperation,
	lastBankOperationId: number,
	annualReportInDBId: string | undefined,
	clearSelectedOperation: () => void
) => {
	const { user } = useAuth()
	const { hideModal } = useModal()
	const [operations, setOperations] = useState([
		{ ...operation, amount: Math.abs(operation.amount) }
	])

	const isAmountPositive = operation.amount > 0

	const handleAddOperation = () =>
		setOperations([...operations, { ...operation, amount: 0 }])

	const handleRemoveOperation = (index: number) => {
		const removedAmount = operations[index].amount
		setOperations(
			operations
				.filter((_, i) => i !== index)
				.map((op, idx) => {
					if (idx === 0) {
						return { ...op, amount: op.amount + removedAmount }
					}
					return op
				})
		)
	}

	const handleAmountChange = (index: number, newAmount: number) => {
		const oldAmount = operations[index].amount
		const difference = newAmount - oldAmount

		setOperations(
			operations.map((op, idx) => {
				if (idx === 0) {
					return { ...op, amount: op.amount - difference }
				} else if (idx === index) {
					return { ...op, amount: newAmount }
				}
				return op
			})
		)
	}

	const handleSubmit = async () => {
		if (!user || !annualReportInDBId) return

		const newOperations = operations.map((operation, index) => ({
			...operation,
			amount: isAmountPositive ? operation.amount : -operation.amount,
			_id:
				index === 0 ? operation._id : (+lastBankOperationId + index).toString(),
			paymentPurpose: operation.paymentPurpose.includes(': [Часть операции]')
				? operation.paymentPurpose
				: `${operation.paymentPurpose}: [Часть операции]`
		}))

		try {
			console.log('lastBankOperationId: ', lastBankOperationId)
			console.log('newOperations: ', newOperations)
			console.log('operation: ', operation)
			await AnnualService.replaceOperation(
				user.uid,
				annualReportInDBId,
				newOperations,
				operation._id
			)
			hideModal()
			clearSelectedOperation()
		} catch (error) {
			console.log('ERROR: ', error)
		}
	}

	const isOperationsChanged = operations.length > 1

	const isTotalAmountAbsExcess =
		operations
			.filter((_, i) => i !== 0)
			.reduce((sum, op) => sum + op.amount, 0) > Math.abs(operation.amount)

	const hasWrongAmountValue = !!operations.find(
		operation => !(operation.amount > 0)
	)

	return {
		operations,
		isAmountPositive,
		handleAddOperation,
		handleRemoveOperation,
		handleAmountChange,
		handleSubmit,
		isOperationsChanged,
		isTotalAmountAbsExcess,
		hasWrongAmountValue
	}
}