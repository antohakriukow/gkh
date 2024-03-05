import TreeItem from './TreeItem'
import { SortableTree, TreeItems } from 'dnd-kit-sortable-tree'
import { FC } from 'react'

import { IAnnualCategoryState } from '~/shared/types/annual.interface'

import { useTreeContext } from '../TreeProvider'

const Tree: FC = () => {
	const { setItems, items } = useTreeContext()

	const pointerSensorOptions = {
		activationConstraint: {
			distance: 5
		}
	}
	return (
		<SortableTree
			items={(items as TreeItems<IAnnualCategoryState>) ?? []}
			onItemsChanged={setItems}
			TreeItemComponent={TreeItem}
			pointerSensorOptions={pointerSensorOptions}
		/>
	)
}
export default Tree
