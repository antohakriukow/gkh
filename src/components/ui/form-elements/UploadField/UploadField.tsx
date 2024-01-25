import { useDroppable } from '@dnd-kit/core'
import cn from 'classnames'
import React, { forwardRef, useCallback, useState } from 'react'

import { IUploadField } from '../form.interface'

import styles from './UploadField.module.scss'

const UploadField = forwardRef<HTMLInputElement, IUploadField>(
	({ placeholder, error, handleFiles, fileNames, style, ...props }, ref) => {
		const [isDragOver, setIsDragOver] = useState(false)
		const { setNodeRef } = useDroppable({ id: 'droppable' })

		const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
			event.preventDefault()
			setIsDragOver(true)
		}, [])

		const onDragLeave = useCallback(
			(event: React.DragEvent<HTMLDivElement>) => {
				event.preventDefault()
				setIsDragOver(false)
			},
			[]
		)

		const onDrop = useCallback(
			(event: React.DragEvent<HTMLDivElement>) => {
				event.preventDefault()
				setIsDragOver(false)
				const newFiles = Array.from(event.dataTransfer.files)
				handleFiles(newFiles)
			},
			[handleFiles]
		)

		const onFileChange = useCallback(
			(event: React.ChangeEvent<HTMLInputElement>) => {
				if (event.target.files) {
					const newFiles = Array.from(event.target.files)
					handleFiles(newFiles)
				}
			},
			[handleFiles]
		)

		return (
			<div className={styles.container} style={style} ref={setNodeRef}>
				<div
					className={cn(styles.uploadField, {
						[styles.error]: error,
						[styles.dragOver]: isDragOver
					})}
				>
					<label>
						{!!placeholder && <span>{placeholder}</span>}
						<input
							ref={ref}
							type='file'
							multiple
							onChange={onFileChange}
							{...props}
						/>
						<div
							className={cn(styles.dropArea, { [styles.dragOver]: isDragOver })}
							onDrop={onDrop}
							onDragOver={onDragOver}
							onDragLeave={onDragLeave}
						>
							{fileNames.length === 0
								? 'Перетащите файлы сюда или кликните для выбора'
								: fileNames.join(', ')}
						</div>
					</label>
				</div>
				{error?.message && (
					<div className={styles.errorMessage}>{error.message}</div>
				)}
			</div>
		)
	}
)

UploadField.displayName = 'UploadField'

export default UploadField
