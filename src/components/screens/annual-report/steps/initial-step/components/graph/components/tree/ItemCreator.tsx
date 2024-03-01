import { useTreeContext } from './TreeProvider'
import React, { FC, useState } from 'react'
import { FaPlus } from 'react-icons/fa6'

import { Button } from '~/components/ui'

import styles from './tree.module.scss'

const ItemCreator: FC = () => {
	const [newItemTitle, setNewItemTitle] = useState('')
	const { createItem } = useTreeContext()

	const handleAddItem = () => {
		if (newItemTitle.trim() !== '') {
			createItem(newItemTitle.trim())
			setNewItemTitle('')
		}
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleAddItem()
		}
	}

	return (
		<div className={styles.itemCreator}>
			<input
				type='text'
				value={newItemTitle}
				onChange={e => setNewItemTitle(e.target.value)}
				onKeyDown={handleKeyDown}
				placeholder='Введите наименование'
			/>
			<Button onClick={handleAddItem}>
				<FaPlus />
			</Button>
		</div>
	)
}

export default ItemCreator
