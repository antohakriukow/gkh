import React, { FC, useState } from 'react'
import { FaPlus } from 'react-icons/fa6'

import { Button } from '~/components/ui'

import { IItemCreator } from '../list.interface'

import styles from './ItemCreator.module.scss'

const ItemCreator: FC<IItemCreator> = ({ onCreate }) => {
	const [newItemTitle, setNewItemTitle] = useState('')

	const handleAddItem = () => {
		if (newItemTitle.trim() !== '') {
			onCreate(newItemTitle)
			setNewItemTitle('')
		}
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleAddItem()
		}
	}

	return (
		<div className={styles.container}>
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
			{/* <button onClick={handleAddItem}>Добавить</button> */}
		</div>
	)
}

export default ItemCreator
