import { OperationsGroup, ToolBar } from '..'
import { ICategoryProps } from './sorter.interface'
import { getGroupedOperations } from './sorter.utils'
import { FC, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6'

import { getOperationsByCategory } from '~/utils/annual/utils'

import styles from './sorter.module.scss'

const Category: FC<ICategoryProps> = ({
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

	const isToolbarDisabled = selectedOperations.length === 0
	const groupedOperations = getGroupedOperations(operations, category)
	const onSubmit = () => handleSubmit(category.id.toString())

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
					<ToolBar onSubmit={onSubmit} disabled={isToolbarDisabled} />
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
								/>
						  ))}
				</>
			)}
		</>
	)
}

export default Category
