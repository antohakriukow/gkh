import OperationsGroup from './OperationsGroup'
import ToolBar from './ToolBar'
import { FC, Fragment, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6'
import { IAnnualOperationTagData } from '~/data/annual-tag-variations'

import {
	IExtendedBankOperation,
	TypeAnnualOperationTag
} from '~/shared/types/annual.interface'

import {
	groupOperationsByPayerName,
	sortOperationsGroupsArrayByPayerName
} from '~/utils/annual.utils'

import styles from './operations.module.scss'

interface ITagProps {
	tag: IAnnualOperationTagData
	operations?: IExtendedBankOperation[]
	level?: number
	toggleOperationSelection: (id: string) => void
	selectedOperations: string[]
	showSeparateModal: (operation: IExtendedBankOperation) => void
	handleSubmit: (tag: TypeAnnualOperationTag) => void
}

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

	const groupedOperations = sortOperationsGroupsArrayByPayerName(
		groupOperationsByPayerName(operations)
	)

	const onSubmit = () => handleSubmit(tag.value)

	const disabled = selectedOperations.length === 0

	return (
		<div className={styles.tag}>
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
				<h4>{tag.title}</h4>
				<ToolBar onSubmit={onSubmit} disabled={disabled} />
			</div>

			{isVisible && (
				<Fragment>
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
				</Fragment>
			)}
		</div>
	)
}
export default Tag
