import { useTreeContext } from './TreeProvider'
import cn from 'clsx'
import {
	SimpleTreeItemWrapper,
	TreeItemComponentProps
} from 'dnd-kit-sortable-tree'
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { MdClose } from 'react-icons/md'

import { IAnnualCategoryState } from '~/shared/types/annual.interface'

import styles from './tree.module.scss'

const TreeItem = forwardRef<
	HTMLDivElement,
	TreeItemComponentProps<IAnnualCategoryState>
>((props, ref) => {
	const { renameItem } = useTreeContext()
	const { onRemove, item } = props

	const [isEditing, setIsEditing] = useState(false)
	const [editedTitle, setEditedTitle] = useState(props.item.value)
	const [isHovered, setIsHovered] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (isEditing && inputRef.current) {
			inputRef.current.focus()
		}
	}, [isEditing])

	const handleRename = useCallback(() => {
		renameItem(item.id.toString(), editedTitle)
		setIsEditing(false)
	}, [editedTitle, item.id, renameItem])

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleRename()
		}
	}

	const color = isHovered ? '#db3140' : '#a6a6a6'

	const toggleColor = (event: React.MouseEvent<HTMLElement>) =>
		setIsHovered(!isHovered)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isEditing &&
				inputRef.current &&
				!inputRef.current.contains(event.target as Node)
			) {
				handleRename()
			}
		}

		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isEditing, handleRename, inputRef])

	const isSingle = item.children?.length === 0

	return (
		<SimpleTreeItemWrapper
			{...props}
			ref={ref}
			contentClassName={cn(styles.item, {
				[styles.single]: isSingle
			})}
			hideCollapseButton={false}
		>
			{isEditing ? (
				<input
					ref={inputRef}
					value={editedTitle}
					onChange={e => setEditedTitle(e.target.value)}
					onKeyDown={handleKeyDown}
				/>
			) : (
				<p onClick={() => setIsEditing(true)}>{item.value}</p>
			)}
			{!!onRemove && (
				<div
					className={styles.icon}
					onClick={e => {
						e.stopPropagation()
						onRemove()
					}}
					onMouseEnter={event => toggleColor(event)}
					onMouseLeave={event => toggleColor(event)}
				>
					<MdClose size={15} color={color} />
				</div>
			)}
		</SimpleTreeItemWrapper>
	)
})

export default TreeItem
