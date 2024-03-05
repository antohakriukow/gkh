import ItemCreator from './components/tree/ItemCreator'
import Tree from './components/tree/Tree'
import { TreeProvider } from './components/tree/TreeProvider'
import { FC } from 'react'

import { SubHeading } from '~/components/ui'

import styles from './Graph.module.scss'

const Graph: FC = () => {
	return (
		<div className={styles.container}>
			<SubHeading title='Настройте иерархию услуг:' />
			<TreeProvider>
				<Tree />
				<ItemCreator />
			</TreeProvider>
		</div>
	)
}

export default Graph
