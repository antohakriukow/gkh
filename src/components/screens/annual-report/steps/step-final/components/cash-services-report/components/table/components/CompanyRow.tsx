import Row from './Row'
import { FC, Fragment, useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'

import { formatNumber } from '~/utils/number.utils'

import { IOperationGroup } from '../table.interface'
import styles from '../table.module.scss'
import { useBankCashServicesTable } from '../useBankCashServicesTable'

const CompanyRow: FC<{ group: IOperationGroup }> = ({ group }) => {
	const { name, inn, operations, total } = group
	const [isVisible, setIsVisible] = useState(false)
	const {} = useBankCashServicesTable(operations)
	const toggleVisible = () => setIsVisible(!isVisible)

	const totalPositive = operations
		.filter(operation => operation.amount > 0)
		.reduce((sum, operation) => sum + operation.amount, 0)

	const totalNegative = operations
		.filter(operation => operation.amount < 0)
		.reduce((sum, operation) => sum + operation.amount, 0)

	return (
		<Fragment>
			<div className={`${styles.gridRow} ${styles.operationRow}`}>
				<div onClick={toggleVisible}>
					{isVisible ? <FaMinus /> : <FaPlus />}
				</div>
				<div>{name}</div>
				<div></div>
				<div>
					{formatNumber(totalPositive) !== '0,00'
						? formatNumber(totalPositive)
						: ''}
				</div>
				<div>
					{formatNumber(totalNegative) !== '0,00'
						? formatNumber(totalNegative)
						: ''}
				</div>
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
