import React, { FC, useState } from 'react'
import { PiCopyBold } from 'react-icons/pi'
import { RiDeleteBin2Line } from 'react-icons/ri'

import { IExtendedBankOperation } from '~/shared/types/annual.interface'

import styles from '../SeparateModal.module.scss'

interface IOperation {
	operation: IExtendedBankOperation
	handleAdd: () => void
	handleRemove: (index: number) => void
	handleAmountChange: (index: number, newAmount: number) => void
	index: number
	isLast: boolean
}

const Operation: FC<IOperation> = ({
	operation,
	handleAdd,
	handleRemove,
	handleAmountChange,
	index,
	isLast
}) => {
	const [inputValue, setInputValue] = useState(operation.amount.toString())

	const isEditable = index !== 0

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value

		value = value.replace(/,/g, '.').replace(/[^\d.]/g, '')

		const parts = value.split('.')
		if (parts.length > 2) value = parts[0] + '.' + parts.slice(1).join('')
		if (parts.length > 1) value = parts[0] + '.' + parts[1].slice(0, 2)

		const newAmount = parseFloat(value) || 0

		setInputValue(value)
		handleAmountChange(index, newAmount)
	}

	return (
		<div className={styles.operation}>
			<p>{index + 1}</p>
			{isEditable ? (
				<input
					type='number'
					value={inputValue}
					min='0'
					onChange={handleChange}
					disabled={!isEditable}
				/>
			) : (
				<p>{operation.amount.toFixed(2)}</p>
			)}
			{isLast && <PiCopyBold onClick={handleAdd} size={20} color='#4553a1' />}
			{isEditable && (
				<RiDeleteBin2Line
					onClick={() => handleRemove(index)}
					size={20}
					color='#db3140'
				/>
			)}
		</div>
	)
}

export default Operation
