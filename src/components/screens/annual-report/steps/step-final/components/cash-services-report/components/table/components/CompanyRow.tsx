import Row from './Row'
import { FC, Fragment, useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'

import { formatNumber } from '~/utils/number.utils'

import { IOperationGroup } from '../table.interface'
import styles from '../table.module.scss'
import { useBankOperationsTable } from '../useBankOperationsTable'

const CompanyRow: FC<{ group: IOperationGroup }> = ({ group }) => {
	const { name, inn, operations, total } = group
	const [isVisible, setIsVisible] = useState(false)
	const {} = useBankOperationsTable(operations)
	const toggleVisible = () => setIsVisible(!isVisible)

	return (
		<Fragment>
			<div className={`${styles.gridRow} ${styles.operationRow}`}>
				<div onClick={toggleVisible}>
					{isVisible ? <FaMinus /> : <FaPlus />}
				</div>
				<div>{name}</div>
				<div></div>
				<div></div>
				<div>{formatNumber(total)}</div>
			</div>
			{isVisible && (
				<Fragment>
					{operations.map(operation => (
						<Row operation={operation} />
					))}
				</Fragment>
			)}
		</Fragment>
	)
}
export default CompanyRow
