import OperationsGroup from './OperationsGroup'
import ToolBar from './ToolBar'
import { FC, Fragment, ReactNode, useCallback, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6'
import { IAnnualOperationTagData } from '~/data/annual-tag-variations'

import {
	IAnnualCategory,
	IExtendedBankOperation,
	TypeAnnualOperationTag
} from '~/shared/types/annual.interface'

import {
	getOperationsByCategory,
	groupOperationsByPayerName,
	groupOperationsByRecipientName,
	sortOperationsGroupsArrayByPayerName,
	sortOperationsGroupsArrayByRecipientName
} from '~/utils/annual.utils'

import styles from './operations.module.scss'

const Tag: FC<{
	tag: IAnnualOperationTagData
	operations?: IExtendedBankOperation[]
	level?: number
	toggleOperationSelection: (id: string) => void
	selectedOperations: string[]
	showModal: (component: ReactNode) => void
	lastBankOperationId: number
	handleSubmit: (tag: TypeAnnualOperationTag) => void
}> = ({
	tag = { title: '', value: '' },
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

	const groupedOperations = sortOperationsGroupsArrayByPayerName(
		groupOperationsByPayerName(operations)
	)

	const onSubmit = () => handleSubmit(tag.value)

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
export default Tag
