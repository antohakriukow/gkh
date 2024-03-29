import { OperationsGroup, ToolBar } from '..'
import { FC, memo, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6'

import {
	IAnnualCategory,
	IExtendedBankOperation
} from '~/shared/types/annual.interface'

import {
	getOperationsByCategory,
	groupOperationsByRecipientName,
	sortOperationsGroupsArrayByRecipientName
} from '~/utils/annual.utils'

import styles from './sorter.module.scss'

const Category: FC<{
	category: IAnnualCategory
	operations?: IExtendedBankOperation[]
	level?: number
	toggleOperationSelection: (id: string) => void
	selectedOperations: string[]
	handleSubmit: (categoryId: string) => void
	showSeparateModal: (operation: IExtendedBankOperation) => void
}> = memo(
	({
		category,
		operations = [],
		level = 0,
		toggleOperationSelection,
		selectedOperations,
		handleSubmit,
		showSeparateModal
	}) => {
		const [isVisible, setIsVisible] = useState(true)
		const toggleVisible = () => setIsVisible(!isVisible)

		const otherDebitOperationsCategoryId = '10000'

		const groupedOperations = category.children
			? []
			: category.id === otherDebitOperationsCategoryId
			? sortOperationsGroupsArrayByRecipientName(
					groupOperationsByRecipientName(operations)
			  )
			: sortOperationsGroupsArrayByRecipientName(
					groupOperationsByRecipientName(
						operations.filter(
							operation => operation.categoryId === category.id.toString()
						)
					)
			  )

		const onSubmit = () => handleSubmit(category.id.toString())

		const disabled = selectedOperations.length === 0

		return (
			<>
				<div
					className={styles.container}
					style={{ marginLeft: `${level * 16}px` }}
				>
					<div>
						{isVisible ? (
							<FaChevronUp onClick={toggleVisible} />
						) : (
							<FaChevronDown onClick={toggleVisible} />
						)}
					</div>
					<h4>{category.value}</h4>
					{!category.children && (
						<ToolBar onSubmit={onSubmit} disabled={disabled} />
					)}
				</div>

				{isVisible && (
					<>
						{category.children
							? category.children.map((cat, index) => {
									return (
										<Category
											key={cat.id}
											category={cat}
											operations={getOperationsByCategory(operations, category)}
											toggleOperationSelection={toggleOperationSelection}
											selectedOperations={selectedOperations}
											handleSubmit={handleSubmit}
											level={level + 1}
											showSeparateModal={showSeparateModal}
										/>
									)
							  })
							: groupedOperations.map(group => (
									<OperationsGroup
										key={group.recipientName}
										partnerName={group.recipientName}
										operations={group.operations}
										toggleOperationSelection={toggleOperationSelection}
										selectedOperations={selectedOperations}
										level={level + 1}
										showSeparateModal={showSeparateModal}
										type='debit'
									/>
							  ))}
					</>
				)}
			</>
		)
	}
)
export default Category
