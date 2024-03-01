import Row from './Row'
import cn from 'clsx'
import React, { useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'

import {
	formatNumber,
	replaceAmountWithFakeIfFalse
} from '~/utils/number.utils'
import { trimStringAtSymbol } from '~/utils/string.utils'

import { IOperationGroup } from '../table.interface'
import styles from '../table.module.scss'

// Убедитесь, что пути к стилям верные

interface IOperationGroupProps {
	groupKey: string
	group: IOperationGroup
	isReportPayed: boolean
}

const Group: React.FC<IOperationGroupProps> = ({
	groupKey,
	group,
	isReportPayed
}) => {
	const [expanded, setExpanded] = useState(false) // Локальное состояние для контроля видимости операций

	return (
		<>
			<div
				data-inn={group.INN}
				className={`${styles.gridRow} ${styles.groupRow}`}
				onClick={() => setExpanded(!expanded)}
			>
				<div>{expanded ? <FaMinus /> : <FaPlus />}</div>
				<div>{trimStringAtSymbol(group.name, '//')}</div>
				<div>
					<p className={cn({ [styles.blurred]: !isReportPayed })}>
						{group.total > 0
							? replaceAmountWithFakeIfFalse(
									formatNumber(group.total),
									isReportPayed
							  )
							: ''}
					</p>
				</div>
				<div>
					<p className={cn({ [styles.blurred]: !isReportPayed })}>
						{group.total < 0
							? replaceAmountWithFakeIfFalse(
									formatNumber(-group.total),
									isReportPayed
							  )
							: ''}
					</p>
				</div>
			</div>
			{expanded &&
				group.operations.map(operation => (
					<Row
						key={operation._id}
						operation={operation}
						isReportPayed={isReportPayed}
					/>
				))}
		</>
	)
}

export default Group
