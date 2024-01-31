import List from './components/list/List'
import ItemCreator from './components/list/item-creator/ItemCreator'
import { useGraph } from './useGraph'
import { FC } from 'react'

import { SubHeading } from '~/components/ui'

import styles from './Graph.module.scss'

const Graph: FC = () => {
	const {
		categories,
		addAnnualCategory,
		removeAnnualCategory,
		updateAnnualCategoryTitle
	} = useGraph()

	return (
		<div className={styles.container}>
			<SubHeading title='Настройте иерархию услуг:' />
			<List
				data={categories}
				onDragStart={() => {}}
				onDragEnd={() => {}}
				onRemove={removeAnnualCategory}
				onRename={(id, title) => updateAnnualCategoryTitle({ _id: id, title })}
			/>
			<ItemCreator onCreate={addAnnualCategory} />
		</div>
	)
}

export default Graph
