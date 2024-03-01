import ItemCreator from './components/tree/ItemCreator'
import Tree from './components/tree/Tree'
import { TreeProvider } from './components/tree/TreeProvider'
import { FC } from 'react'

import { SubHeading } from '~/components/ui'

import {
	IAnnualReport,
	TypeAnnualDirection
} from '~/shared/types/annual.interface'

import styles from './Graph.module.scss'

const Graph: FC<{
	direction: TypeAnnualDirection
	annualReport: IAnnualReport
}> = ({ direction, annualReport }) => {
	return (
		<div className={styles.container}>
			<SubHeading title='Настройте иерархию услуг:' />
			<TreeProvider direction={direction} annualReport={annualReport}>
				<Tree />
				<ItemCreator />
			</TreeProvider>
		</div>
	)
}

export default Graph
