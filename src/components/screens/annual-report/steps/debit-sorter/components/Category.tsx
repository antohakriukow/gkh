import OperationsGroup from './OperationsGroup'
import ToolBar from './ToolBar'
import { FC, Fragment, ReactNode, useCallback, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6'

import {
	IAnnualCategory,
	IExtendedBankOperation
} from '~/shared/types/annual.interface'

import {
	getOperationsByCategory,
	groupOperationsByRecipientName,
	sortOperationsGroupsArray
} from '~/utils/annual.utils'

import styles from './operations.module.scss'

const Category: FC<{
	category: IAnnualCategory
	operations?: IExtendedBankOperation[]
	level?: number
	toggleOperationSelection: (id: string) => void
	selectedOperations: string[]
	showModal: (component: ReactNode) => void
	lastBankOperationId: number
	handleSubmit: (categoryId: string) => void
}> = ({
	category,
	operations = [],
	level = 0,
	toggleOperationSelection,
	selectedOperations,
	showModal,
	lastBankOperationId,
	handleSubmit
}) => {
	const [isVisible, setIsVisible] = useState(true)

	const toggleVisible = () => setIsVisible(!isVisible)

	const groupedOperations = category.children
		? []
		: category.id === '10000'
		? sortOperationsGroupsArray(groupOperationsByRecipientName(operations))
		: sortOperationsGroupsArray(
				groupOperationsByRecipientName(
					operations.filter(
						operation => operation.categoryId === category.id.toString()
					)
				)
		  )

	const onSubmit = () => handleSubmit(category.id.toString())

	const disabled = selectedOperations.length === 0

	return (
		<Fragment>
			<div
				className={styles.category}
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
				<Fragment>
					{category.children
						? category.children.map(cat => (
								<Category
									key={cat.id}
									category={cat}
									operations={getOperationsByCategory(operations, category)}
									toggleOperationSelection={toggleOperationSelection}
									selectedOperations={selectedOperations}
									showModal={showModal}
									lastBankOperationId={lastBankOperationId}
									handleSubmit={handleSubmit}
									level={level + 1}
								/>
						  ))
						: groupedOperations.map(group => (
								<OperationsGroup
									key={group.recipientName}
									partnerName={group.recipientName}
									operations={group.operations}
									toggleOperationSelection={toggleOperationSelection}
									selectedOperations={selectedOperations}
									showModal={showModal}
									lastBankOperationId={lastBankOperationId}
									level={level + 1}
								/>
						  ))}
				</Fragment>
			)}
		</Fragment>
	)
}
export default Category
