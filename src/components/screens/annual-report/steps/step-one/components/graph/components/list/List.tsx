import Item from './item/Item'
import { IList } from './list.interface'
import { FC } from 'react'

import styles from './list.module.scss'

const List: FC<IList> = ({
	data,
	onDragStart,
	onDragEnd,
	onRemove,
	onRename
}) => {
	const handleRemoveItem = (_id: string) => {
		if (!!onRemove) onRemove(_id)
	}

	const handleRenameItem = (_id: string, title: string) => {
		if (!!onRename) onRename(_id, title)
	}

	return (
		<>
			{data && (
				<div className={styles.container}>
					{data.map(category => (
						<Item
							_id={category._id}
							title={category.title}
							onDragStart={() => {}}
							onDragEnd={() => {}}
							onRemove={handleRemoveItem}
							onRename={handleRenameItem}
						/>
					))}
				</div>
			)}
		</>
	)
}
export default List
