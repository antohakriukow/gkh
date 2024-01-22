import { useDroppable } from '@dnd-kit/core'
import cn from 'classnames'
import React, { forwardRef, useCallback, useState } from 'react'

import { IField } from '../form.interface'

import styles from './UploadField.module.scss'

const UploadField = forwardRef<HTMLInputElement, IField>(
	({ placeholder, error, style, ...props }, ref) => {
		const [files, setFiles] = useState<File[]>([])
		const { setNodeRef } = useDroppable({ id: 'droppable' })

		const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
			event.preventDefault()
			const newFiles = Array.from(event.dataTransfer.files)
			setFiles(prevFiles => [...prevFiles, ...newFiles])
		}, [])

		const onFileChange = useCallback(
			(event: React.ChangeEvent<HTMLInputElement>) => {
				if (event.target.files) {
					const newFiles = Array.from(event.target.files)
					setFiles(prevFiles => [...prevFiles, ...newFiles])
				}
			},
			[]
		)

		return (
			<div className={styles.container} style={style} ref={setNodeRef}>
				<div className={cn(styles.uploadField, { [styles.error]: error })}>
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
							className={styles.dropArea}
							onDrop={onDrop}
							onDragOver={e => e.preventDefault()}
						>
							{files.length === 0
								? 'Перетащите файлы сюда или кликните для выбора'
								: files.map(file => file.name).join(', ')}
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
