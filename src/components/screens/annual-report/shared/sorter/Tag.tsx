import { OperationsGroup, ToolBar } from '..'
import { ITagProps } from './sorter.interface'
import { FC, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6'

import {
	groupOperationsByPayerName,
	sortOperationsGroupsArrayByPayerName
} from '~/utils/annual.utils'

import styles from './sorter.module.scss'

const Tag: FC<ITagProps> = ({
	tag = { title: '', value: '' },
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
	const groupedOperations = sortOperationsGroupsArrayByPayerName(
		groupOperationsByPayerName(operations)
	)
	const onSubmit = () => handleSubmit(tag.value)

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
				<h4>{tag.title}</h4>
				<ToolBar onSubmit={onSubmit} disabled={isToolbarDisabled} />
			</div>

			{isVisible && (
				<>
					{groupedOperations.map(group => (
						<OperationsGroup
							key={group.payerName}
							partnerName={group.payerName}
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
export default Tag
