import { FC, useEffect, useRef, useState } from 'react'
import { MdClose, MdDragIndicator } from 'react-icons/md'

import { IItem } from '../list.interface'

import styles from './item.module.scss'

const Item: FC<IItem> = ({
	_id,
	title,
	onDragStart,
	onDragEnd,
	onRemove,
	onRename
}) => {
	const [isEditing, setIsEditing] = useState(false)
	const [editedTitle, setEditedTitle] = useState(title)
	const [isHovered, setIsHovered] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (isEditing && inputRef.current) {
			inputRef.current.focus()
		}
	}, [isEditing])

	const handleRename = () => {
		console.log('Renamed:', _id, editedTitle)
		if (!!onRename) onRename(_id, editedTitle)
		setIsEditing(false)
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleRename()
		}
	}

	const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
		if (isEditing && !inputRef.current?.contains(e.target as Node)) {
			handleRename()
		}
	}

	const color = isHovered ? '#db3140' : '#a6a6a6'

	const toggleColor = (event: React.MouseEvent<HTMLElement>) =>
		setIsHovered(!isHovered)

	return (
		<div id={_id} className={styles.container} onMouseDown={handleClickOutside}>
			<div className={styles.icon}>
				<MdDragIndicator size={16} color='#a6a6a6' />
			</div>
			{isEditing ? (
				<input
					ref={inputRef}
					value={editedTitle}
					onChange={e => setEditedTitle(e.target.value)}
					onKeyDown={handleKeyDown}
				/>
			) : (
				<p onClick={() => setIsEditing(true)}>{title}</p>
			)}
			{!!onRemove && (
				<div
					className={styles.icon}
					onClick={() => onRemove(_id)}
					onMouseEnter={event => toggleColor(event)}
					onMouseLeave={event => toggleColor(event)}
				>
					<MdClose size={15} color={color} />
				</div>
			)}
		</div>
	)
}

export default Item
